import {Component} from 'angular2/core';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectService} from './projects/project.service';

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ProjectsComponent],
    providers: [ProjectService]
    
})
export class AppComponent{
    
}