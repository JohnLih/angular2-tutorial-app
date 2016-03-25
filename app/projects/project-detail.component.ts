import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {Project} from './project.model';
import {ProjectService} from './project.service';
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
    @Output() delete: EventEmitter<number> = new EventEmitter();
    
    constructor(private _router: Router, private _projectService: ProjectService){}
    
    editProject(project: Project){
        this._router.navigate(['ProjectEdit', {id: project.id}]);
    }
    
    deleteProject(project: Project){
        if(window.confirm('Are you sure you want to delete this project?')){
            this._projectService.deleteProject(project).subscribe(()=>{
                this.delete.emit(project.id);    
            });    
        }
    }
}