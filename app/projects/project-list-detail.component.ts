import {Component, ViewChild} from 'angular2/core';
import {ProjectListComponent} from './projects-list.component';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectFormComponent} from './project-form.component';
import {Project} from './project.model';

@Component({
    selector: 'projects',
    templateUrl: 'app/projects/project-list-detail.component.html',
    directives: [ProjectListComponent, ProjectDetailComponent, ProjectFormComponent]
})
export class ProjectListDetailComponent{
    
    @ViewChild(ProjectListComponent) projectListComponent: ProjectListComponent;
    
    /**
     * Passing selectedProject object using event binding to project-detail component.
     * No need of below code if you are passing data using local variable in template. 
     */
    selectedProject: Project;
    
    isAddOrEdit: boolean = false;
    
    /**
     * Passes selectedProject object to project-detail component on selection change in project-list component.
     */
    onProjectSelect(selectedProject: Project){
        this.selectedProject = selectedProject;
    }
    
    onProjectDataSaved(projectId: number){
        this.isAddOrEdit = false;
        this.projectListComponent.loadProjects().add(()=>{
           this.projectListComponent.selectProjectById(projectId); 
        });
    }
    
    onProjectAdd(){
        this.isAddOrEdit = true; 
        this.selectedProject = null;
    }
    
    onProjectDelete(projectId: number){
        this.projectListComponent.removeProjectFromList(projectId);
        this.projectListComponent.selectFirstProject();
    }
}