import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {ExceptionService} from '../shared/services/exception.service';

@Injectable()
export class EmployeeService {
    
    url: string = 'api/employees';
    
    constructor(private _http: Http, private _excpetionService: ExceptionService) { }
    
    getEmployees(){
        return this._http.get(this.url)
            .map(res => res.json().data)
            .catch(this._excpetionService.handleError);
    }
}