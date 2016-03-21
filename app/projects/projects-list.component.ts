import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {ProjectsFilterPipe} from './projects-filter.pipe';
import {MaterializeElementDirective} from '../shared/directives/materialize-element.directive';
import {ProjectService} from './project.service';
import {Project} from './project.model';

@Component({
    selector: 'projects-list',
    templateUrl: 'app/projects/projects-list.component.html',
    styles: [`
        .mdl-list__item:hover {
            background-color: #eaeaea;
            transition: all 0.3s;
            cursor: pointer;
        }
        .selected{
            background-color: #eaeaea;
        }
    `],
    pipes: [ProjectsFilterPipe],
    directives: [MaterializeElementDirective]
})
export class ProjectListComponent{
    
    @Output() projectSelect = new EventEmitter();
    /**
     * List of projects
     */
    projects: Project[] = [];
    
    /**
     * Selected project from the list
     */
    selectedProject: Project = null;
    
    /**
     * Query text to filter projects by their name
     */
    filterText: string;
    
    constructor(private _projectService: ProjectService){
        
    }
    
    /**
     * Loads projects
     */
    loadProjects(){
        this.projects = this._projectService.getProjects();
    }
    
    /**
     * Sets selected project on click of any project from the list
     */
    selectProject(selectedProject){
        this.selectedProject = selectedProject;
        this.projectSelect.emit(this.selectedProject);
    }
    
    /**
     * Selects first project on component initialization
     */
    selectFirstProject(){
        this.selectProject(this.projects[0]);
    }
    
    /**
     * Component's hook which is executed on component initialization phase
     */
    ngOnInit(){
        this.loadProjects();
        this.selectFirstProject();
    }
}