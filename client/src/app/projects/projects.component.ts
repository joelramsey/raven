import { Component, OnInit } from '@angular/core';
import { ProjectDaoService } from '../shared/services/index';
import { Project } from '../shared/models/index';

@Component({
  selector: 'rvn-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<Project> = [];
  public newProject: Project = null;

  constructor(private _projectDaoService: ProjectDaoService) { }

  /**
   * Fetch user projects on init.
   */
  ngOnInit() {
    this._projectDaoService.getProjects().subscribe((projects: Array<Project>) => {
      this.projects = projects;
    });
  }

  /**
   * Checks all current projects (by id) to see if any match
   * the provided project parameter. If so, that entry is updated.
   * This ensures that project references in this array are
   * up-to-date with the latest version from the server
   * (which are returned after a successful project save).
   *
   * @param $project
   */
  updateProjectReference($project: Project) {
    let projectIdx = -1;

    // Check by id
    //
    this.projects.some((project: Project, i: number) => {
      if (project.id === $project.id) {
        projectIdx = i;
        return true;
      }

      return false;
    });

    if (projectIdx > -1) {
      this.projects[projectIdx] = $project;
    }
  }

  /**
   * Removes a project from the currently displayed projects.
   * @param $project
   */
  removeProject($project: Project) {
    let projectIdx = this.projects.indexOf($project);

    if (projectIdx > -1) {
      this.projects.splice(projectIdx, 1);
    }
  }

  /**
   * Adds a project to the currently displayed projects.
   * @param $project
   */
  addProject($project: Project) {
    this.projects.push($project);
    this.newProject = null;
  }

  /**
   * Adds a new mock project.
   */
  addNewProject() {
    if (!this.newProject) {
      this.newProject = {
        id: null,
        name: 'New Project',
        description: 'Add a project description here!',
        sources: [],
        citation_style: null
      };
    }
  }
}
