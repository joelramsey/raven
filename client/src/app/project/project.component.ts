import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Project, Source } from '../shared/models/index';
import {
  ProjectDaoService,
  ProjectExportService,
  SourceDaoService,
  ObservableResultHandlerService
} from '../shared/services/index';
import { SourcePillClickEvent } from '../shared/models/source-pill-click-event.interface';
import { WindowRefService } from '../shared/services/window-ref.service';

@Component({
  selector: 'rvn-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild('exportLink') exportLinkRef: ElementRef;

  /**
   * Current project. Initializes to empty.
   */
  project: Project = {
    id: null,
    name: 'New Project',
    description: 'This is a default project template.',
    sources: [],
    citation_style: null
  };

  newSourceVisible: boolean;
  visibleSources: Array<Source> = [];
  showNoSourcesMessage: boolean;
  exportLink: string = '';
  exporting: boolean = false;


  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _observableResultHandler: ObservableResultHandlerService,
              private _windowRef: WindowRefService,
              private _projectDaoService: ProjectDaoService,
              private _projectExportService: ProjectExportService,
              private _sourceDaoService: SourceDaoService) {
  }

  ngOnInit() {
    this._activatedRoute.params.forEach((params: Params) => {

      // Get project from service, if it exists.
      //
      if (params['id']) {
        let id = +params['id'];
        this._projectDaoService.getProject(id)
          .switchMap((project: Project) => {
            this.project = project;
            this._projectDaoService.activeProject = project;

            return this._sourceDaoService.getSources(project);
          })
          .subscribe((sources: Array<Source>) => {
            this.project.sources = sources;

            // Copy for usage in displaying data
            //
            this.visibleSources = sources.slice().filter((source: Source) => {
              return source.visible;
            });

            // Set message if no sources
            //
            if (!sources.length) {
              this.showNoSourcesMessage = true;
            }
          });
      }
    });
  }

  showNewSource() {
    this._router.navigate(['project', this.project.id, 'sources']);
  }

  /**
   * Toggles a source's visibility; if it's supposed to be
   * visible, the source is added to the visible sources
   * array; otherwise it is removed.
   *
   * @param $source
   */
  toggleVisibility($source: SourcePillClickEvent) {
    $source.source.visible = !$source.source.visible;

    if ($source.source.visible) {

      // Add to visible sources
      //
      if (this.visibleSources.indexOf($source.source) === -1) {
        this.visibleSources.push($source.source);
      }

    } else {

      // Remove from visible sources
      //
      let sourceIdx: number = this.visibleSources.indexOf($source.source);

      if (sourceIdx > -1) {
        this.visibleSources.splice(sourceIdx, 1);
      }
    }

    // Persist visibility change
    //
    this._sourceDaoService.saveSources([$source.source], this.project)
      .subscribe(() => {
        // No-op
        //
      }, (err: any) => {
        console.log(err);
      });

    // Because Angular 2 Change Detection doesn't seem to think that
    // removing/adding an element counts as a "valid" change...
    //
    this.visibleSources = this.visibleSources.slice();
  }

  /**
   * Sends the current project to the export service.
   */
  exportProject() {

    this.exporting = true;
    this._projectExportService.exportProject(this.project)
      .subscribe((url: string) => {

        this.exporting = false;

        // Modify button URL
        //
        this.exportLinkRef.nativeElement.href = url;

        // Create a native click event to get around browser popups
        //
        let clickEvent = this._windowRef.nativeDocument.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        this.exportLinkRef.nativeElement.dispatchEvent(clickEvent, true)
      }, (error: any) => {

        this.exporting = false;
        this._observableResultHandler.failure(error);
      });
  }
}
