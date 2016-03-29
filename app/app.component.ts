import {Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectsComponent} from './projects/projects.component';
import {ExceptionService} from './shared/services/exception.service';
import {XHRBackend, HTTP_PROVIDERS} from 'angular2/http';
import {InMemoryBackendService, SEED_DATA, InMemoryBackendConfig} from 'a2-in-memory-web-api/core';
import {InMemoryDataService} from '../api/in-memory-data.service';
import {ProjectService} from './projects/project.service';

@RouteConfig([
    {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
    {path: '/project/...', name: 'Projects', component: ProjectsComponent},
])
@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectsComponent],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        ProjectService,
        ExceptionService,
        provide(XHRBackend, {useClass: InMemoryBackendService}), 
        provide(SEED_DATA, {useClass: InMemoryDataService}),
        provide(InMemoryBackendConfig, { useValue: { delay: 100 } }),
    ]
    
})
export class AppComponent{
    
    title: string;
    
    constructor(private _router: Router){
        this._router.subscribe((url: string)=>{
            this.title = url.startsWith('project') ? 'Projects' : 'Dashboard';
        });
    }
}