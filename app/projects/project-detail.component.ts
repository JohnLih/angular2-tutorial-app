import {Component, Input} from 'angular2/core';

@Component({
    selector: 'project-detail',
    templateUrl: 'app/projects/project-detail.component.html',
    styleUrls: ['app/projects/project-detail.component.css']
})
export class ProjectDetailComponent{
    @Input() project;
}