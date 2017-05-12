import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project, Source } from '../models/index';
import { HtmlExportService } from './html-export.service';
import { CloudConvertCompletedResponse } from '../models/cloudconvert.interface';

@Injectable()
export class ProjectExportService {

  constructor(private _htmlExportService: HtmlExportService) {
  }

  public exportProject(project: Project): Observable<string> {

    let nn = '\n\n';
    let citations = '';
    let citationHeader = 'Works Cited' + nn;
    let style = 'mla7';

    // Add citations
    //
    project.sources.forEach((source: Source) => {
      if (source.record.citation) {
        citations += source.record.citation.text + nn;

        style = JSON.parse(source.record.citation.json).style;
      }
    });

    if (style == 'apa') {
      citationHeader = 'References' + nn;
    }

    return this._htmlExportService.exportToDocx(
      project.name,
      project.notes + nn + citationHeader + citations
    )
      .map((response: CloudConvertCompletedResponse) => {
        return 'https://' + response.output.url;
      });
  }
}

