import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Project} from './project.model';
import {ExceptionService} from '../shared/services/exception.service';

@Injectable()
export class ProjectService {

    url: string = 'api/projects';

    constructor(private _http: Http, private _excpetionService: ExceptionService) {}

    getProjects() {
        return this._http
            .get(this.url)
            .map(res => <Project[]>res.json().data)
            .catch(this._excpetionService.handleError);
    }
    
    getProject(projectId: number){
        return this._http
            .get(`${this.url}/${projectId}`)
            .map(res => <Project>res.json().data)
            .catch(this._excpetionService.handleError);
    }
    
    addProject(oProject: Project){
        return this._http
            .post(this.url, JSON.stringify(oProject))
            .map(res => res.json().data)
            .catch(this._excpetionService.handleError);
    }
    
    updateProject(oProject: Project){
        return this._http
            .put(`${this.url}/${oProject.id}`, JSON.stringify(oProject))
            .map(res => res.json().data)
            .catch(this._excpetionService.handleError);
    }
    
    deleteProject(oProject: Project){
        return this._http
            .delete(`${this.url}/${oProject.id}`)
            .map(res => <Project>res.json().data)
            .catch(this._excpetionService.handleError);
    }
}