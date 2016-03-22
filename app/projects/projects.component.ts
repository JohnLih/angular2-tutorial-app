import {Component} from 'angular2/core';
import {ProjectListComponent} from './projects-list.component';
import {ProjectDetailComponent} from './project-detail.component';
import {Project} from './project.model';
import {ProjectService} from './project.service';

@Component({
    selector: 'projects',
    templateUrl: 'app/projects/projects.component.html',
    providers: [ProjectService],
    directives: [ProjectListComponent, ProjectDetailComponent]
})
export class ProjectsComponent{
    /**
     * Passing selectedProject object using event binding to project-detail component.
     * No need of below code if you are passing data using local variable in template. 
     */
    selectedProject: Project;
    
    /**
     * Passes selectedProject object to project-detail component on selection change in project-list component.
     */
    onProjectSelect(selectedProject){
        this.selectedProject = selectedProject;
    }
}