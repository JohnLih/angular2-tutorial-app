import {Component} from 'angular2/core';
import {ProjectsComponent} from './projects/projects.component';

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ProjectsComponent]
    
})
export class AppComponent{
    
}