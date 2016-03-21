import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Project} from './project.model';

@Injectable()
export class ProjectService {

    url: string = 'api/projects';

    constructor(private _http: Http) {}

    getProjects() {
        return this._http.get(this.url)
            .map(res => <Project[]>res.json().data)
            .catch(this._handleError);
    }

    private _handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}