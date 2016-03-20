import {Component, Input} from 'angular2/core';
import {PopoverDirective} from '../shared/directives/popover.directive';

@Component({
    selector: 'project-detail',
    templateUrl: 'app/projects/project-detail.component.html',
    styleUrls: ['app/projects/project-detail.component.css'],
    directives: [PopoverDirective]
})
export class ProjectDetailComponent{
    @Input() project;
}