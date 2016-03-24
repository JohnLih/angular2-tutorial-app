/**
 * As in angular 2, the components are loaded dynamically, the mdl scripts 
 * won't work by default. This directive upgrades the element to mdl if mdl classes
 * are used on the element.
 */
import {Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: '[materializeElement]'
})
export class MaterializeElementDirective{
    
    constructor(private _el: ElementRef){
        this._upgradeElement(this._el.nativeElement);
    }
    
    /**
     * Upgrades dom element to material dom element
     */
    private _upgradeElement(ele: HTMLElement){
        componentHandler.upgradeElement(ele);    
    }
}