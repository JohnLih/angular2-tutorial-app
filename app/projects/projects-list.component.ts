import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {ProjectsFilterPipe} from './projects-filter.pipe';
import {MaterializeElementDirective} from '../shared/directives/materialize-element.directive';
import {ProjectService} from './project.service';
import {Project} from './project.model';
import {MaterializeDirective} from '../shared/directives/materialize.directive';

@Component({
    selector: 'projects-list',
    templateUrl: 'app/projects/projects-list.component.html',
    styles: [`
        .mdl-list__item:hover {
            background-color: #eaeaea;
            transition: all 0.3s;
            cursor: pointer;
        }
        .selected {
            background-color: #eaeaea;
        }
        #filterProjects {
            width: calc(100% - 54px);
            margin-right: 10px;
        }
    `],
    pipes: [ProjectsFilterPipe],
    directives: [MaterializeElementDirective, MaterializeDirective]
})
export class ProjectListComponent {

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

    constructor(private _router: Router, private _projectService: ProjectService) { }

    /**
     * Loads projects
     */
    loadProjects() {
        return this._projectService.getProjects().subscribe((projects) => {
            this.projects = projects;
        });
    }

    /**
     * Sets selected project on click of any project from the list
     */
    selectProject(selectedProject) {
        this.selectedProject = selectedProject;
        this.projectSelect.emit(this.selectedProject);
    }

    getProjectById(projectId: number) {
        return this.projects.filter(project => project.id === projectId)[0];
    }

    /**
     * Selects project by its id. This method is called from project compoennt, 
     * to select added/edited project.
     */
    selectProjectById(projectId: number) {
        var project = this.getProjectById(projectId);
        this.selectProject(project);
    }

    /**
     * Selects first project on component initialization
     */
    selectFirstProject() {
        this.selectProject(this.projects[0]);
    }

    addNewProject() {
        // passing null just to avoid compilation error by typescript
        this._router.navigate(['ProjectAdd']);
    }

    removeProjectFromList(projectId: number) {
        var project = this.getProjectById(projectId);
        this.projects.splice(this.projects.indexOf(project), 1);
    }

    /**
     * Component's hook which is executed on component initialization phase
     */
    ngOnInit() {
        this.loadProjects().add(() => {
            this.selectFirstProject();
        })
    }
}