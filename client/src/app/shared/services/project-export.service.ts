import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project } from '../models/index';
import { HtmlExportService } from './html-export.service';
import { CloudConvertCompletedResponse } from '../models/cloudconvert.interface';

@Injectable()
export class ProjectExportService {

  constructor(private _htmlExportService: HtmlExportService) {
  }

  public exportProject(project: Project): Observable<string> {
    return this._htmlExportService.exportToDocx(project.name, project.notes)
      .map((response: CloudConvertCompletedResponse) => {
        return 'https://' + response.output.url;
      });
  }
}

