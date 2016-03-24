/**
 * material-datepicker directive is a supporting library of https://github.com/T00rk/bootstrap-material-datetimepicker for angular 2 and mdl.
 * This directive provides support for two-way databinding of datepicker in angular 2 and handling of state of mdl. 
 */
import {Directive, ElementRef, Input, Output, EventEmitter} from 'angular2/core';

@Directive({
    selector: '[materialDatepicker]'
})
export class MaterialDatepicker{
    
    @Input()
    set ngModel(value){
        this._el.nativeElement.value = moment(value).format(this.format);
    }
    
    @Input() format: string = 'MM/DD/YYYY';
    
    @Output() ngModelChange = new EventEmitter();
    
    private _datepicker;
    
    constructor(private _el: ElementRef){
        this.initDatepicker();
    }
    
    _attachEventListener($ele){
        $ele.on('change', () => {
            var dt = moment($ele.val(), this.format).toDate();
            this.ngModelChange.emit(dt);
            $ele.parent('.mdl-textfield').removeClass('is-focused');
        });
    }
    
    initDatepicker(){
        var $ele = $(this._el.nativeElement);
        this._datepicker = $ele.bootstrapMaterialDatePicker.bind($ele);
        
        // initializing datepicker
        this._datepicker({
            time: false, 
            format: this.format
         });
         
         // adding change event listener
        this._attachEventListener($ele);
    }
}