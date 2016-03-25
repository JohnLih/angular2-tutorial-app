import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProjectListDetailComponent} from './project-list-detail.component';

@RouteConfig([
    {path: '/', name: 'ProjectListDetail', component: ProjectListDetailComponent, useAsDefault: true}
])
@Component({
    selector: 'project',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class ProjectsComponent{
    
}