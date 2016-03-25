import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ProjectService} from '../projects/project.service';
import {Project} from '../projects/project.model';
import {MaterializeDirective} from '../shared/directives/materialize.directive';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
    styles: [`
        .mdl-card{
            margin: 15px;
        }
        .mdl-card__title{
            height: 150px;
        }
    `]
})
export class DashboardComponent implements OnInit{
    
    activeProjects: Project[] = [];
    
    constructor(private _projectService: ProjectService){}
    
    loadActiveProjects(){
        this._projectService.getProjects().subscribe((projects)=>{
            this.activeProjects = projects.filter(project => !project.isCompleted);
        })    
    }
    
    ngOnInit(){
        this.loadActiveProjects();
    }
}