/**
 * Directive to enable support of toggling mdl switch/checkbox on change of ngModel value.
 */
import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
    selector: '[materialToggle]'
})
export class MaterialToggle {

    @Input()
    set ngModel(value: boolean) {
        if (this._$ele) {
            if (this._$ele.hasClass('mdl-switch')) {
                this._toggleSwitch(this._$ele[0], value);
            }

            if (this._$ele.hasClass('mdl-checkbox')) {
                this._toggleCheckbox(this._$ele[0], value);
            }
        }
    }

    private _$ele;

    private _toggleSwitch(ele: HTMLElement, value) {
        if (!ele.MaterialSwitch) {
            return;
        }

        if (value) {
            ele.MaterialSwitch.on();
        } else {
            ele.MaterialSwitch.off();
        }
    }

    private _toggleCheckbox(ele: HTMLElement, value) {
        if (!ele.MaterialCheckbox) {
            return;
        }

        if (value) {
            ele.MaterialCheckbox.check();
        } else {
            ele.MaterialCheckbox.uncheck();
        }
    }

    constructor(private _el: ElementRef) {
        this._$ele = $($(this._el.nativeElement).parents('.mdl-switch, .mdl-checkbox')[0]);
    }
}