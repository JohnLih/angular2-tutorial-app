import {Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: '[materializeElement]'
})
export class MaterializeElementDirective{
    
    constructor(el: ElementRef){
        this._upgradeElement(el.nativeElement);
    }
    
    /**
     * Upgrades dom element to material dom element
     */
    private _upgradeElement(ele: HTMLElement){
        componentHandler.upgradeElement(ele);
    }
}