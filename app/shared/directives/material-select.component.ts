/**
 * A dropdown control with material design and angular 2 support.
 * Inspiration taken from : http://creativeit.github.io/getmdl-select/
 */
import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'material-select',
    templateUrl: 'app/shared/directives/material-select.component.html',
    styles: [`
        .mdl-icon-toggle__label {
            float:right;
            margin-top:-30px;
            color: rgba(0, 0, 0, 0.4);
        }
        .mdl-menu__container {
	        width: 100% !important;
        }
        
        .mdl-menu__container .mdl-menu {
	        width: 100%;
	    }
    `]
})
export class MaterialSelect{
    @Input() name: string;
    @Input() items: any[];
    @Input() label: string;
    @Input() displayOptionFn: Function;
    @Input() selectedValue: any;
    @Output() selectedValueChange: any = new EventEmitter();
    
    selectItem(oItem: any){
        this.selectedValue = oItem;
        this.selectedValueChange.emit(oItem);
    }
}