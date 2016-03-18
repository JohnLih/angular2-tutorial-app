import {Component} from 'angular2/core';
import {ProjectListComponent} from './projects-list.component';

@Component({
    selector: 'projects',
    templateUrl: 'app/projects/projects.component.html',
    directives: [ProjectListComponent]
})
export class ProjectsComponent{
    
    
}