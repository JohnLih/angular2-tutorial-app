import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Employee} from '../employees/employee.model';

@Component({
    selector: 'project-employee-list',
    templateUrl: 'app/projects/project-employee-list.component.html',
    styles: [`
        .employee-detail-table{
            min-width: 500px;
            margin-top: 10px;
        }
    `]
})
export class ProjectEmployeeListComponent{
    
    @Input() employees: Employee[];
    @Input() isShowAction: boolean = false;
    @Output() employeeRemove: EventEmitter<Employee> = new EventEmitter();
    
    removeEmployee(employee: Employee, index){
        this.employees.splice(index, 1);
        this.employeeRemove.emit(employee);
    }
}