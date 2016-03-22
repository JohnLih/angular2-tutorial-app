import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ExceptionService{
    
    handleError(error: Response){
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}