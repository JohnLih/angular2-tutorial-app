import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProjectListDetailComponent} from './project-list-detail.component';
import {ProjectFormComponent} from './project-form.component';

@RouteConfig([
    {path: '/', name: 'ProjectListDetail', component: ProjectListDetailComponent, useAsDefault: true},
    {path: '/add', name: 'ProjectAdd', component: ProjectFormComponent},
    {path: '/:id', name: 'ProjectEdit', component: ProjectFormComponent}
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