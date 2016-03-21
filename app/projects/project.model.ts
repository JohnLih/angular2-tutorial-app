import {Client} from '../clients/client.model';
import {Employee} from '../employees/employee.model';

export class Project{
    id: number = null;
    name: string = null;
    client: Client = null;
    details: string = null;
    isCompleted: boolean = false;
    startDate: number = null;
    endDate: number = null;
    employees: Employee[] = [];
}