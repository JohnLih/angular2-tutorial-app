/**
 * As in angular 2, the components are loaded dynamically, the mdl scripts 
 * won't work by default. This directive converts all the elements, with mdl classes, to mdl elements.
 */
import {Directive} from 'angular2/core';

@Directive({
    selector: '[materialize]'
})
export class MaterializeDirective{
    
    constructor(){
        this._upgradeDOM();
    }
    
    /**
     * Upgrades dom elements to material dom element
     */
    private _upgradeDOM(){
        setTimeout(function(){
            componentHandler.upgradeDom();
        }, 0);    
    }
}