import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {RouteParams, Router, CanDeactivate, ComponentInstruction} from 'angular2/router';
import {ProjectService} from './project.service';
import {Project} from './project.model';
import {EmployeeService} from '../employees/employee.service';
import {Employee} from '../employees/employee.model';
import {ClientService} from '../clients/client.service';
import {Client} from '../clients/client.model';
import {ProjectEmployeeListComponent} from './project-employee-list.component';
import {MaterializeDirective} from '../shared/directives/materialize.directive';
import {MaterialSelect} from '../shared/directives/material-select.component';
import {MaterialDatepicker} from '../shared/directives/material-datepicker.directive';
import {MaterialToggle} from '../shared/directives/material-toggle.directive';
import {MDLIntialValidationSuppressor} from '../shared/directives/mdl-init-validation-suppressor.directive';
import {Observable} from 'rxjs/Rx';
import {Response} from 'angular2/http';

@Component({
    selector: 'project-form',
    templateUrl: 'app/projects/project-form.component.html',
    providers: [EmployeeService, ClientService],
    directives: [MaterializeDirective, MaterialSelect, MaterialDatepicker,
        MaterialToggle, MDLIntialValidationSuppressor, ProjectEmployeeListComponent],
    styles: [`
        .mdl-textfield.project-details-field{
            width: 100%;
        }
        .mdl-static-label{
            color: #3f51b5;
            font-size: 12px; 
            display: block; 
            width: 100%;
        }
    `]
})
export class ProjectFormComponent implements OnInit, CanDeactivate {
    
    /**
     * project object bound to form controls
     */
    project: Project;
    
    /**
     * Captures project data on load of it in edit mode and on start in add mode.
     * This is used for comparing it with actual data when user navigates without saving the data.
     */
    initialProject: Project;
    
    /**
     * List of clients for dropdown
     */
    clients: Client[];
    
    /**
     * List of employees for dropdown
     */
    employees: Employee[] = [];

    /**
     * List of employee who are not part of the project
     */
    unmappedEmployees: Employee[] = [];

    /**
     * Value set in employee selection dropdown
     */
    employeeToAdd: Employee;

    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _projectService: ProjectService,
        private _employeeService: EmployeeService,
        private _clientService: ClientService) { }

    
    /**
     * Loads project by its id
     */
    loadProject(projectId: number) {
        if (projectId) {
            this._projectService
                .getProject(projectId)
                .subscribe((project: Project) => {
                    this.initialProject = project;
                    this.project = Object.assign({}, project);
                    this.updateUnmappedEmpList();
                });
        }
    }
    
    /**
     * Loads list of clients
     */
    loadClients() {
        this._clientService
            .getClients()
            .subscribe((clients: Client[]) => {
                this.clients = clients;
            });
    }
    
    /**
     * Loads list of employees
     */
    loadEmployees() {
        this._employeeService
            .getEmployees()
            .subscribe((employees: Employee[]) => {
                this.employees = employees;
                this.updateUnmappedEmpList();
            });
    }
    
    /**
     * Returns text to be displayed in client dropdown option. Called for each option.
     * We will find better option for this in future.
     */
    clientOptionDisplayFn(client: Client) {
        return client ? client.name : '';
    }
    
    /**
     * Returns text to be displayed in employee dropdown option. Called for each option.
     * We will find better option for this in future.
     */
    employeeOptionDisplayFn(employee: Employee) {
        return employee ? `${employee.name} (${employee.role})` : '';
    }
    
    /**
     * Updates unmapped employee list on add/remove of an employee or on load of a project. 
     */
    updateUnmappedEmpList() {
        var projectEmployeeId = this.project ? this.project.employees.map(employee => employee.id) : [];
        this.unmappedEmployees = this.employees.filter((employee: Employee) => {
            return projectEmployeeId.indexOf(employee.id) === -1;
        });
    }

    /**
     * Adds employee to the project and updates unmapped employee list.
     */
    addEmployeeToProject() {
        if (this.employeeToAdd) {
            this.project.employees.push(this.employeeToAdd);
            this.updateUnmappedEmpList();
            this.employeeToAdd = null;
        }
    }
    
    /**
     * Navigates to previous page.
     */
    cancel() {
        window.history.back();
    }
    
    /**
     * Inserts/Updates data to in memory store and navigates to previous page.
     */
    save() {
        var observable: Observable<Response>;

        // Converting dates to its number representation to store in db. This will be removed from here in future.
        this.project.startDate = +this.project.startDate;
        this.project.endDate = +this.project.endDate;

        if (this.project.id) {
            observable = this._projectService.updateProject(this.project);
        } else {
            observable = this._projectService.addProject(this.project);
        }
        observable.subscribe((result: any) => {
            // re-initializing initialProject value with new data.
            this.project = this.initialProject = (result || this.project);
            window.history.back();
        });
    }

    /**
     * Prompts the user to save data if he/she navigates aways from page without saving the data.
     * This is one of the router lifecycle hooks.
     */
    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        var isDataChanged = !_.isEqual(this.project, this.initialProject); 
        if(isDataChanged){
            if(window.confirm('You have unsaved changes. Do you want to cancel changes?')){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }
    
    /**
     * Initiation logic for the project form component.
     * This is one of the lifecycle hooks of component.
     */
    ngOnInit() {
        var projectId = +this._routeParams.get('id');
        if (projectId) {
            this.loadProject(projectId);
        } else {
            this.initialProject = this.project = new Project();
        }

        this.loadClients();
        this.loadEmployees();
    }
}