import { Injectable } from '@angular/core';

import { Project } from '../models/index';

@Injectable()
export class ProjectExportService {

  constructor() { }

  public exportProject(project: Project) {
    console.log(project);
  }
}

