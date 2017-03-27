import {
  Component, OnInit, Input, style, state, animate, group, trigger, transition,
  OnDestroy, AfterViewChecked, Output, EventEmitter
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { ActivatedRoute } from '@angular/router';
import * as Moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { Project, Source, EntityCardModel, Resolution, SearchResultListItem } from '../../shared/models/index';
import { ProjectDaoService, ResolutionDaoService } from '../../shared/services/index';
import { RecordViewComponent } from '../record-view/record-view.component';

@Component({
  selector: 'rvn-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  animations: [
    trigger('entityCardInOut', [
      state('*', style({width: '*', height: '*', opacity: 1})),
      transition('void => *', [
        style({width: 0, opacity: 0}),
        group([
          animate('0.2s 0.2s ease', style({
            width: '*',
            height: '*'
          })),
          animate('0.2s 0.2s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.2s ease', style({
            margin: 0,
            width: 0,
            height: 0
          })),
          animate('0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class ProjectViewComponent implements OnInit, AfterViewChecked, OnDestroy {

  public Views = {
    CITATIONS: 'citations',
    DATA_TABLE: 'data-table',
    ENTITY_RELATIONSHIPS: 'entity-relationships',
    TREE_MAP: 'tree-map',
    SEARCH: 'search'
  };

  @Input() project: Project;
  @Input() activeView: string = this.Views.DATA_TABLE;
  @Input() visibleSources: Array<Source>;
  @Output() projectNotesChanged: EventEmitter<string> = new EventEmitter<string>();

  public saveStatus: string;
  public hideSaveMessage: boolean = false;
  public activeEntity: EntityCardModel;
  public resolutions: Array<Resolution>;

  private _noteChangeDebounceTime: number = 800;
  private _hideMessageTime: number = 4 * 1000;
  private _hideSaveMessageTimeout;
  private _routeFragmentSubscription: any;
  private _currentFragment: string;

  cardX = '0';
  cardY = '0';

  constructor(private _projectDaoService: ProjectDaoService,
              private _resolutionDaoService: ResolutionDaoService,
              private _dialog: MdDialog,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {

    // Fetch entity resolution information
    //
    this._resolutionDaoService.getResolutions()
      .subscribe((resolutions: Array<Resolution>) => this.resolutions = resolutions);

    // Subscribe to and update project notes value.
    // Save the project soon after typing stops.
    //
    this.projectNotesChanged
      .debounceTime(this._noteChangeDebounceTime)
      .distinctUntilChanged()
      .subscribe((value: string) => {

        if (this.project.notes === value) {

          // Update last saved and return immediately; no reason to save,
          // as the fact that we're here either implies identical notes
          // or application initialization.
          //
          this.saveStatus = 'Last saved ' + Moment(this.project.updated_at).fromNow();
          return;
        }

        // Update notes value and indicate to the user that
        // their project is saving.
        //
        this.project.notes = value;
        this.saveStatus = 'Saving...';
        this.hideSaveMessage = false;

        // Clear hide message timeout
        //
        clearTimeout(this._hideSaveMessageTimeout);

        this._projectDaoService.saveProject(this.project)
          .subscribe((project: Project) => {

            // Update project and save status
            //
            this.project = project;
            this.saveStatus = 'Last saved ' + Moment(project.updated_at).fromNow();

            // Set timeout to hide save message (no need for it to always show)
            //
            this._hideSaveMessageTimeout = setTimeout(() => {
              this.hideSaveMessage = true;
            }, this._hideMessageTime);

          }, () => {

            // Set save status to error - recommend the user copy their notes
            // and try again later
            //
            this.saveStatus = 'An error occurred trying to save your notes. If you want to keep them, it\'s probably ' +
              'a good idea to copy them elsewhere and try again later.';
          });
      });
  }

  /**
   * Checks for route fragments, since Angular's router isn't quite capable of it yet...
   */
  ngAfterViewChecked() {
    if (!this._routeFragmentSubscription) {
      this._routeFragmentSubscription = this._route.fragment
        .subscribe(fragment => {
          if (fragment && fragment !== this._currentFragment) {
            this._currentFragment = fragment;
            this.goTo(fragment);
          }
        });
    }
  }

  ngOnDestroy() {
    this._routeFragmentSubscription.unsubscribe();
    this.projectNotesChanged.unsubscribe();
  }

  /**
   * Wrapper around Frola's model change event; this allows us to debounce the changes
   * and use our own RxJS operators on the result.
   *
   * @param value
   */
  froalaModelChanged(value: string) {
    this.projectNotesChanged.next(value);
  }

  showEntityCardFromTreeMap($event: any) {
    this.cardX = $event.x + 'px';
    this.cardY = $event.y + 'px';
  }

  updateEntityFromTreeMap($event: any) {
    this.activeEntity = $event;
  }

  showEntityCardFromLinkDiagram($event: any) {
    this.cardX = $event.x + 'px';
    this.cardY = $event.y + 'px';
  }

  updateEntityFromLinkDiagram($event: any) {
    this.activeEntity = $event;
  }

  closeCard() {
    this.activeEntity = null;
  }

  handleSearchClick($event: SearchResultListItem) {
    let dialogRef = this._dialog.open(RecordViewComponent, {
      'width': '80%',
      'height': '90%'
    });

    // Set record instance
    //
    dialogRef.componentInstance.record = $event;
  }

  /**
   * Specifies a location on the page to navigate to.
   *
   * Currently, this only modifies the current window hash.
   * @param location to navigate to
   */
  goTo(location: string) {
    this.activeView = location;
  }
}
