import {Pipe, PipeTransform} from 'angular2/core';
import {Project} from './project.model';

@Pipe({
    name: 'projectsFilter'
})
export class ProjectsFilterPipe implements PipeTransform{
    
    /**
     * Implementing PipeTransform's transform method to filter projects by its name.
     */
    transform(lstProjects: Project[], args: string[]){
        var filterText = args[0];
        if(lstProjects && filterText){
            return lstProjects.filter((oProject: Project)=>{
                return oProject.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
            });
        }else{
            return lstProjects;
        }
    }
}