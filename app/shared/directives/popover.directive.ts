import {Directive, TemplateRef, ViewContainerRef, ElementRef, Input, OnInit, OnDestroy} from 'angular2/core';

@Directive({
    selector: "[popover]",
    host: {
        '(click)': 'togglePopover($event)'
    }
})
export class PopoverDirective implements OnInit, OnDestroy {

    @Input() template: any;

    @Input() title: String;

    isVisible: boolean = false;

    constructor(private _elementRef: ElementRef) { }
    
    private _getPopoverEle() {
        return $(this._elementRef.nativeElement).next();
    }
    
    /**
     * Returns popover card template structure
     */
    private _getPopoverCardTpl() {
        return `<div class="mdl-card mdl-shadow--8dp popover">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${this.title}</h2>
                    </div>
                    <div class="popover-content"></div>
                </div>`;
    }
    
    /**
     * Adds popover element to dom tree
     */
    private _preparePopoverEle() {
        var $nativeEle = $(this._elementRef.nativeElement);
        $nativeEle.wrap('<span style="position: relative;"></span>');
        var $popoverEle = $(this._getPopoverCardTpl()).css('left', $nativeEle.width() + 5 + 'px');
        $nativeEle.after($popoverEle);
        $popoverEle.hide();
    }
    
    /**
     * Body click event handler which closes popover on click of body element excluding popover element and its trigger element
     */
    private _bodyClickHandler(event: JQueryEventObject) {
        var $popoverEle = this._getPopoverEle();
        if (event.target !== this._elementRef.nativeElement && $(event.target).parents('.popover')[0] !== $popoverEle[0]) {
            this.hidePopover();
        }
    }

    private _listenBodyClick() {
        $('body').on('click', this._bodyClickHandler.bind(this));
    }

    private _removeBodyClickListener() {
        $('body').off('click', this._bodyClickHandler);
    }

    togglePopover(event: MouseEvent) {
        event.stopPropagation();
        if (this.isVisible) {
            this.hidePopover();
        } else {
            this.showPopover();
        }
    }

    showPopover() {
        this.isVisible = true;
        var $popover = this._getPopoverEle();
        $popover.find('.popover-content').html(this.template.innerHTML);
        $popover.show();
    }

    hidePopover() {
        this.isVisible = false;
        var $popover = this._getPopoverEle();
        $popover.hide();
    }

    ngOnInit() {
        $(this.template).hide();
        this._preparePopoverEle();
        this._listenBodyClick();
    }

    ngOnDestroy() {
        this._removeBodyClickListener();
    }
}