/**
 * MDL library adds is-invalid class to the controls, when they are invalid irrespective of whether form has novalidate attribute or not.
 * But actually, untill the field is not interacted, it should remain valid. This directive removes the is-invalid class that MDL adds 
 * while initial validation proecess.
 */
import {Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: '[suppressMDLInitValidation]'
})
export class MDLIntialValidationSuppressor{
    
    constructor(private _el: ElementRef){
        this._suppressInitialValidation();
    }
    
    private _suppressInitialValidation(){
        setTimeout(() => {
            $(this._el.nativeElement).parent().removeClass('is-invalid');    
        });
    }
}