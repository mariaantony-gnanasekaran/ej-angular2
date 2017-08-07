import { Directive, ElementRef, ViewContainerRef, TemplateRef, Injector } from '@angular/core';
import { EJTemplateDirective, ejtemplate } from './../template';
import { ngTemplateid } from './../core';


@Directive({
    selector: `[e-edit-template]`
})
export class GridEditTemplateDirective extends EJTemplateDirective {
    referenceObj: any = {};
    constructor(protected el: ElementRef, protected viewContainerRef: ViewContainerRef,
        protected templateRef: TemplateRef<any>, protected injector: Injector) {
        super(el, viewContainerRef, templateRef);
    }
    ngOnInit() {
        var template = this.viewContainerRef.createEmbeddedView(this.templateRef, { '$implicit': [] });
        var templID = ej.getGuid('angulartmplstr');
        var tempEle = ej.buildTag('div#' + templID);
        $(tempEle).append(template.rootNodes);

        $(tempEle).remove();
    }
    ngAfterViewChecked() {
        ej.createObject('_templateRef', this.templateRef, this.referenceObj);
        ej.createObject('_viewRef', this.viewContainerRef, this.referenceObj);
        var viewRference = this.referenceObj;

        ej.template['text/x-' + ngTemplateid + 'gridedittemplate'] = function (self: any, selector: string, data: any, index: number, prop: any) {
            return ejtemplate(self, selector, data, index, viewRference);
        };
        ej.template.render = ej.template['text/x-' + ngTemplateid + 'gridedittemplate'];
    }

}

