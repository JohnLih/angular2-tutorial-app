import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Project} from './project.model';
import {PopoverDirective} from '../shared/directives/popover.directive';
import {ProjectEmployeeListComponent} from './project-employee-list.component';

@Component({
    selector: 'project-detail',
    templateUrl: 'app/projects/project-detail.component.html',
    styleUrls: ['app/projects/project-detail.component.css'],
    directives: [PopoverDirective, ProjectEmployeeListComponent]
})
export class ProjectDetailComponent{
    @Input() project;
    @Output() edit: EventEmitter<Project> = new EventEmitter();
    
    editProject(project: Project){
        this.edit.emit(project);
    }
}