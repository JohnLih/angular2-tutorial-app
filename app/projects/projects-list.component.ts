import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {ProjectsFilterPipe} from './projects-filter.pipe';
import {MaterializeElementDirective} from '../shared/directives/materialize-element.directive';

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
    projects: any[] = [];
    
    /**
     * Selected project from the list
     */
    selectedProject: any = null;
    
    /**
     * Query text to filter projects by their name
     */
    filterText: string;
    
    /**
     * Loads projects
     */
    loadProjects(){
        this.projects = [{
            id: 1,
            name: 'Project 1',
            client: {
                id: 1,
                name: 'Client 1',
                timezone: 'PST',
                country: 'USA',
                email: 'client1@domain.com'
            },
            details: 'Project 1 Description',
            isCompleted: false,
            startDate: 1451606400000,
            endDate: 1456770600000, 
            employees: [
                {id: 1, name: 'Employee 1', role: 'FrontEnd Developer', email: 'emp1@domain.com'},
                {id: 2, name: 'Employee 2', role: 'BackEnd Developer', email: 'emp2@domain.com'},
                {id: 3, name: 'Employee 3', role: 'Tester', email: 'emp3@domain.com'},
                {id: 4, name: 'Employee 4', role: 'Project Manager', email: 'emp4@domain.com'}
            ]
        },{
            id: 2,
            name: 'Project 2',
            client: {
                id: 2,
                name: 'Client 2',
                timezone: 'IST',
                country: 'India',
                email: 'client2@domain.com'
            },
            details: 'Project 2 Description',
            isCompleted: true,
            startDate: 1433097000000,
            endDate: 1436898600000, 
            employees: [
                {id: 4, name: 'Employee 4', role: 'Project Manager', email: 'emp4@domain.com'},
                {id: 5, name: 'Employee 5', role: 'FullStack Developer', email: 'emp5@domain.com'}
            ]
        },{
            id: 3,
            name: 'Project 3',
            client: {
                id: 3,
                name: 'Client 3',
                timezone: 'CET',
                country: 'Germany',
                email: 'client3@domain.com'
            },
            details: 'Project 3 Description',
            isCompleted: true,
            startDate: 1438367400000,
            endDate: 1444415400000, 
            employees: [
                {id: 2, name: 'Employee 2', role: 'BackEnd Developer', email: 'emp2@domain.com'},
                {id: 3, name: 'Employee 3', role: 'Tester', email: 'emp3@domain.com'},
                {id: 4, name: 'Employee 4', role: 'Project Manager', email: 'emp4@domain.com'}
            ]
        },{
            id: 4,
            name: 'Project 4',
            client: {
                id: 4,
                name: 'Client 4',
                timezone: 'AEST',
                country: 'Austrilia',
                email: 'client4@domain.com'
            },
            details: 'Project 4 Description',
            isCompleted: false,
            startDate: 1456770600000,
            endDate: 1464719400000, 
            employees: [
                {id: 1, name: 'Employee 1', role: 'FrontEnd Developer', email: 'emp1@domain.com'},
                {id: 3, name: 'Employee 3', role: 'Tester', email: 'emp3@domain.com'},
                {id: 4, name: 'Employee 4', role: 'Project Manager', email: 'emp4@domain.com'}
            ]
        }];    
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