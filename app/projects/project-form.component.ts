import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
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
export class ProjectFormComponent implements OnInit {
    
    @Input() 
    set projectId(id: number){
        if(id){
            this.loadProject(id);    
        }else{
            this.project = new Project();
        }
    }
    
    @Output()
    changesSaved: EventEmitter<Project> = new EventEmitter();
    
    @Output()
    changesCancelled: EventEmitter<Project> = new EventEmitter();
    
    project: Project;
    
    clients: Client[];
    
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
        private _projectService: ProjectService,
        private _employeeService: EmployeeService,
        private _clientService: ClientService) { }


    loadProject(projectId: number) {
        if (projectId) {
            this._projectService
                .getProject(projectId)
                .subscribe((project: Project) => {
                    this.project = Object.assign({}, project);
                    this.updateUnmappedEmpList();
                });
        }
    }
    
    loadClients(){
        this._clientService
            .getClients()
            .subscribe((clients: Client[]) => {
                this.clients = clients;
            });    
    }
    
    loadEmployees(){
        this._employeeService
            .getEmployees()
            .subscribe((employees: Employee[]) => {
                this.employees = employees;
                this.updateUnmappedEmpList();
            });    
    }
    
    clientOptionDisplayFn(client: Client){
        return client ? client.name : ''; 
    }
    
    employeeOptionDisplayFn(employee: Employee){
        return employee ? employee.name : ''; 
    }
    
    updateUnmappedEmpList(){
        var projectEmployeeId = this.project ? this.project.employees.map(employee => employee.id) : [];
        this.unmappedEmployees = this.employees.filter((employee: Employee)=>{
            return projectEmployeeId.indexOf(employee.id) === -1; 
        });
    }
    
    addEmployeeToProject(){
        if(this.employeeToAdd){
            this.project.employees.push(this.employeeToAdd);
            this.updateUnmappedEmpList();
            this.employeeToAdd = null;    
        }
    }
    
    cancel(){
        this.changesCancelled.emit(this.project);    
    }
    
    save(){
        var observable: Observable<Response>;
        
        // Converting dates to its number representation to store in db. This will be removed from here in future.
        this.project.startDate = +this.project.startDate;
        this.project.endDate = +this.project.endDate;
        
        if(this.project.id){
            observable = this._projectService.updateProject(this.project);
        }else{
            observable = this._projectService.addProject(this.project);
        }
        observable.subscribe((result: any) => {
            // passing project id for maintaining project selection
            this.changesSaved.emit(result ? result.id : this.project.id);    
        });
    }
    
    ngOnInit() {
        this.loadProject(this.projectId);
        this.loadClients();
        this.loadEmployees();
    }
}