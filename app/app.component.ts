import {Component, provide} from 'angular2/core';
import {ProjectsComponent} from './projects/projects.component';
import {ExceptionService} from './shared/services/exception.service';
import {XHRBackend, HTTP_PROVIDERS} from 'angular2/http';
import {InMemoryBackendService, SEED_DATA} from 'a2-in-memory-web-api/core';
import {InMemoryDataService} from '../api/in-memory-data.service';

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ProjectsComponent],
    providers: [
        HTTP_PROVIDERS,
        ExceptionService,
        provide(XHRBackend, {useClass: InMemoryBackendService}), 
        provide(SEED_DATA, {useClass: InMemoryDataService})
    ]
    
})
export class AppComponent{
    
}