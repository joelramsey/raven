import { Component, OnInit, Input, style, state, animate, group, trigger, transition } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import * as Moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';

import { Project, Source, EntityCardModel } from '../../shared/models/index';
import { ProjectDaoService } from '../../shared/services/index';

@Component({
  selector: 'rvn-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  animations: [
    trigger('entityCardInOut', [
      state('*', style({width: '*', height: '*', opacity: 1})),
      transition('void => *', [
        style({width: 10, opacity: 0}),
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
          animate('0.2s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class ProjectViewComponent implements OnInit {

  @Input() project:Project;
  @Input() visibleSources:Array<Source>;
  public notesControl:AbstractControl = new FormControl();
  public saveStatus:string;
  public hideSaveMessage:boolean = false;
  public activeEntity:EntityCardModel;

  private _noteChangeDebounceTime:number = 800;
  private _hideMessageTime:number = 4 * 1000;
  private _hideSaveMessageTimeout;

  cardX = '0';
  cardY = '0';

  constructor(private _projectDaoService:ProjectDaoService) {
  }

  ngOnInit() {

    // Subscribe to and update project notes value.
    // Save the project soon after typing stops.
    //
    this.notesControl.valueChanges
      .debounceTime(this._noteChangeDebounceTime)
      .distinctUntilChanged()
      .subscribe((value:string) => {

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
          .subscribe((project:Project) => {

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
      })
  }

  showEntityCardFromTreeMap($event:any) {
    this.cardX = $event.x + 'px';
    this.cardY = $event.y + 'px';
  }

  updateEntityFromTreeMap($event:any) {
    this.activeEntity = $event;
  }
  
  showEntityCardFromLinkDiagram($event:any) {
    this.cardX = $event.x + 'px';
    this.cardY = $event.y + 'px';
    console.log($event);
  }

  updateEntityFromLinkDiagram($event:any) {
    this.activeEntity = $event;
  }
}
