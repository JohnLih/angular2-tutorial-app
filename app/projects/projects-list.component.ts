import {Component, OnInit} from 'angular2/core';

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
    `]
})
export class ProjectListComponent{
    
    /**
     * List of projects
     */
    projects: any[] = [];
    
    /**
     * Selected project from the list
     */
    selectedProject: any = null;
    
    /**
     * Loads projects
     */
    loadProjects(){
        this.projects = [{
            id: 1,
            name: 'Project 1',
            clientName: 'Client 1',
            details: 'Project 1 Description',
            isCompleted: false,
            startDate: 1451606400000,
            endDate: 1456770600000, 
            employees: [
                {id: 1, name: 'Employee 1', role: 'FrontEnd Developer'},
                {id: 2, name: 'Employee 2', role: 'BackEnd Developer'},
                {id: 3, name: 'Employee 3', role: 'Tester'},
                {id: 4, name: 'Employee 4', role: 'Project Manager'}
            ]
        },{
            id: 2,
            name: 'Project 2',
            clientName: 'Client 2',
            details: 'Project 2 Description',
            isCompleted: true,
            startDate: 1433097000000,
            endDate: 1436898600000, 
            employees: [
                {id: 4, name: 'Employee 4', role: 'Project Manager'},
                {id: 5, name: 'Employee 5', role: 'FullStack Developer'}
            ]
        },{
            id: 3,
            name: 'Project 3',
            clientName: 'Client 3',
            details: 'Project 3 Description',
            isCompleted: true,
            startDate: 1438367400000,
            endDate: 1444415400000, 
            employees: [
                {id: 2, name: 'Employee 2', role: 'BackEnd Developer'},
                {id: 3, name: 'Employee 3', role: 'Tester'},
                {id: 4, name: 'Employee 4', role: 'Project Manager'}
            ]
        },{
            id: 4,
            name: 'Project 4',
            clientName: 'Client 4',
            details: 'Project 4 Description',
            isCompleted: false,
            startDate: 1456770600000,
            endDate: 1464719400000, 
            employees: [
                {id: 1, name: 'Employee 1', role: 'FrontEnd Developer'},
                {id: 3, name: 'Employee 3', role: 'Tester'},
                {id: 4, name: 'Employee 4', role: 'Project Manager'}
            ]
        }];    
    }
    
    /**
     * Sets selected project on click of any project from the list
     */
    selectProject(selectedProject){
        this.selectedProject = selectedProject;
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