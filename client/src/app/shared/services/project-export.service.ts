import { Injectable } from '@angular/core';

import { Project } from '../models/index';
import { HtmlExportService } from './html-export.service';
import { CloudConvertCompletedResponse } from '../models/cloudconvert.interface';
import { ObservableResultHandlerService } from './observable-result-handler.service';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class ProjectExportService {

  constructor(private _htmlExportService: HtmlExportService,
              private _windowRef: WindowRefService,
              private _observableResultHandler: ObservableResultHandlerService) {
  }

  public exportProject(project: Project) {
    this._htmlExportService.exportToDocx(project.name, project.notes)
      .subscribe((response: CloudConvertCompletedResponse) => {
        this._windowRef.nativeWindow.open('https://' + response.output.url, '_blank');
        this._observableResultHandler.success('Export successful.');
      }, (error: any) => {
        this._observableResultHandler.failure(error);
      });
  }
}

