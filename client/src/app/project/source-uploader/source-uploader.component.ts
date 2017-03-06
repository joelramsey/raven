import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef, Renderer, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AuthData, Angular2TokenService } from 'angular2-token/angular2-token';
import { ParsedResponseHeaders, Headers } from 'ng2-file-upload/ng2-file-upload';
import 'rxjs/add/operator/debounceTime';

import { TextSourceParserPipe } from './pipes/index';
import { Source, SourcePillClickEvent, SourceUploadState, Project, SourceCreator } from '../../shared/models/index';
import {
  SourceDaoService,
  ProjectDaoService,
  ObservableResultHandlerService,
  RavenFileUploader
} from '../../shared/services/index';

@Component({
  selector: 'rvn-source-uploader',
  templateUrl: './source-uploader.component.html',
  styleUrls: ['./source-uploader.component.scss']
})
export class SourceUploaderComponent implements OnInit, SourceCreator {

  @Input() public project:Project;
  @Output() public created:EventEmitter<Source> = new EventEmitter<Source>();
  @Output() public done:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public cancelled:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput: ElementRef;

  public UPLOAD_STATES = {
    NEW: {
      key: 'new',
      message: ''
    },
    UPLOADING_FILES: {
      key: 'uploadingFiles',
      message: 'Uploading files...'
    },
    ADDING_SOURCES: {
      key: 'addingSources',
      message: 'Adding sources...'
    },
    DONE: {
      key: 'done',
      message: 'Done!'
    }
  };

  public uploader:RavenFileUploader;
  public showQueue:boolean = false;
  public fileOver:boolean = false;
  public rawSourcesControl:FormControl = new FormControl();
  public state: SourceUploadState = this.UPLOAD_STATES.NEW;
  public uploadError: string = '';
  public sourceUploadProgress: number = 0;
  public uploaderPlaceholder: string = 'Drag some files over me, paste URLs, or even enter plain text. I\'ll turn ' +
    'it into a source for your project.';

  // Sources
  //
  public textSources:Array<Source> = [];
  public linkSources:Array<Source> = [];

  private _cachedFileObjects:Array<Source> = [];

  constructor(private _textSourceParserService:TextSourceParserPipe,
              private _errorHandler: ObservableResultHandlerService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _renderer: Renderer,
              private _tokenService: Angular2TokenService,
              private _sourceDaoService: SourceDaoService,
              private _projectDaoService: ProjectDaoService,
              private _dialog: MdDialog) {
  }

  ngOnInit() {
    this.rawSourcesControl.valueChanges
      .debounceTime(1000)
      .subscribe((rawSources:string) => {

        let parsedSources:any  = this._textSourceParserService.transform(rawSources);

        this.textSources = parsedSources.textSources;
        this.linkSources = parsedSources.linkSources;
      });

    // Load project, if necessary
    //
    if (!this.project) {
      this._activatedRoute.parent.params.forEach((params: Params) => {

        // Get project from service, if it exists.
        //
        if (params['id']) {
          let id = +params['id'];

          this._projectDaoService.getProject(id).subscribe((project: Project) => {

            this.project = project;

            // Instantiate uploader
            //
            this.uploader = new RavenFileUploader({
              url: '/api/items?project=' + this.project.id,
              allowedFileType: ['pdf', 'doc', 'docx', 'txt'],
              headers: this._getAuthHeaders()
            });

            this.uploader.onCompleteAll = this.addTextAndUrlSources.bind(this);
            this.uploader.onErrorItem = this.fileUploadFailed.bind(this);
          });
        }
      });
    }
  }

  /**
   * Adds sources. Triggers file upload, which passes control to #{@link addTextAndUrlSources}
   * upon completion of file upload. If there are no files to upload, it calls #{@link addTextAndUrlSources}
   * immediately.
   */
  addSources() {
    this.uploadError = '';
    this.rawSourcesControl.disable();

    // Upload if applicable; otherwise proceed straight
    // to source upload.
    //
    if (this.uploader.queue.length) {
      this.state = this.UPLOAD_STATES.UPLOADING_FILES;
      this.uploader.uploadAll();
    } else {
      this.addTextAndUrlSources([]);
    }
  }

  /**
   * Adds
   */
  addTextAndUrlSources(fileSources: Array<any>) {
    this.state = this.UPLOAD_STATES.ADDING_SOURCES;

    let totalLength = this.linkSources.length + this.textSources.length;

    if (totalLength === 0) {

      // All done
      //
      this.state = this.UPLOAD_STATES.DONE;

      this.rawSourcesControl.setValue('');
      this.rawSourcesControl.enable();
      this.uploader.clearQueue();

      this.done.emit(true);
    } else {

      // Create sources
      //
      this._sourceDaoService.createSources(this.textSources.concat(this.linkSources), this.project)
        .subscribe((source: Source) => {
          this.incrementSourceUploadProgress(source, totalLength);
          this.created.emit(source);
        }, (source: Source) => {
          this.incrementSourceUploadProgress(source, totalLength);
          this._errorHandler.failure(source);
        });
    }
  }

  /**
   * This function serves two purposes; the first is to update the source
   * upload progress. In addition to that, it pops sources off the list
   * which have been uploaded. Upon completion, it clears out and re-enables
   * the raw text textarea.
   *
   * @param source
   * @param totalLength
   */
  incrementSourceUploadProgress(source: Source, totalLength: number) {

    let completed = this.sourceUploadProgress / 100 * totalLength + 1;
    let linkSourceIdx = this.linkSources.indexOf(source);
    let textSourceIdx = this.textSources.indexOf(source);

    // Remove from current set
    //
    if (textSourceIdx > -1) {
      this.textSources.splice(textSourceIdx, 1);
    } else if (linkSourceIdx > -1) {
      this.linkSources.splice(linkSourceIdx, 1);
    }

    if (completed === totalLength) {
      this.state = this.UPLOAD_STATES.DONE;

      this.rawSourcesControl.setValue('');
      this.rawSourcesControl.enable();
      this.done.emit(true);
    } else {
      this.sourceUploadProgress = completed / totalLength * 100;
    }
  }

  /**
   * Cancels any in-progress uploads.
   */
  cancel() {
    this.uploader.clearQueue();
    this.cancelled.emit();
    this._router.navigate(['project', this.project.id]);
  }

  /**
   * Handles file upload failure.
   *
   * @param item
   * @param response
   * @param status
   * @param headers
   */
  fileUploadFailed(item: any, response: any, status: number, headers: ParsedResponseHeaders) {

    try {
      let res: any = JSON.parse(response);
      this.uploadError = ' (Encountered error during file upload: ' + status + ' - ' + res.error + ')';
    } catch(e) {
      console.log(e);
      this.uploadError = ' (Encountered error during file upload: ' + response + ')';
    }

    this._errorHandler.failure('Failed to upload file: ' + item.file.name);
  }

  /**
   * Translates an array of file item objects into a list of sources.
   * Checks the current file queue against the cached list to avoid
   * spastic re-renders.
   *
   * @returns {Array<Source>}
   */
  get fileSources():Array<Source> {

    if (!this.uploader) {
      return [];
    }

    // Refresh queue if changed
    //
    if (this.uploader.queue.length !== this._cachedFileObjects.length) {
      this._cachedFileObjects = this.uploader.queue.reduce((sources:Array<Source>, fileObject:any) => {
        sources.push({
          id: null,
          type: 'file',
          title: fileObject.file.name,
          visible: true,
          content: fileObject
        });

        return sources;
      }, []);
    }

    return this._cachedFileObjects;
  }

  /**
   * Returns a boolean value indicating whether any sources are ready for upload.
   * @returns {boolean}
   */
  get sourcesPending():boolean {
    return this.fileSources.length + this.textSources.length + this.linkSources.length > 0;
  }

  /**
   * Returns the total number of sources queued for upload.
   * @returns {number}
   */
  get sourceCount(): number {
    return (this.fileSources.length + this.textSources.length + this.linkSources.length);
  }

  /**
   * Returns a boolean value indicating whether an async process (e.g., file upload) is running.
   * @returns {boolean}
   */
  get busy():boolean {
      return (this.state !== this.UPLOAD_STATES.NEW && this.state !== this.UPLOAD_STATES.DONE);
  }


  /**
   * Removes a file from both the file upload queue and the cached
   * file list.
   *
   * @param $sourceEvent
   */
  removeFile($sourceEvent:SourcePillClickEvent) {
    let cacheIdx = this._cachedFileObjects.indexOf($sourceEvent.source);

    if (cacheIdx > -1) {
      this._cachedFileObjects.splice(cacheIdx, 1);
    }

    this.uploader.removeFromQueue($sourceEvent.source.content);
  }

  /**
   * Removes a pending text source.
   *
   * @param $sourceEvent
   */
  removeText($sourceEvent:SourcePillClickEvent) {
    this.textSources.splice($sourceEvent.index, 1);
  }

  /**
   * Removes a pending link source.
   *
   * @param $sourceEvent
   */
  removeLink($sourceEvent:SourcePillClickEvent) {
    this.linkSources.splice($sourceEvent.index, 1);
  }

  /**
   * Handles the mouseover event for a file (so we can change the
   * file border color - whoo!)
   *
   * @param $event
   */
  fileOverBase($event:boolean) {
    this.fileOver = $event;
  }

  /**
   * Manually triggers a click event on the file upload input.
   * We do this in order to mock a Material file upload button,
   * as they aren't natively supported.
   */
  openFileDialog() {
    let mouseEvent = new MouseEvent('click', { bubbles: true });

    this._renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [mouseEvent]);
  }

  private _getAuthHeaders(): Array<Headers> {

    let authData: AuthData = this._tokenService.currentAuthData;

    return [
      { name: 'access-token', value: authData.accessToken },
      { name: 'client',       value: authData.client },
      { name: 'expiry',       value: authData.expiry },
      { name: 'token-type',   value: authData.tokenType },
      { name: 'uid',          value: authData.uid }
    ];
  }

  /**
   * Toggles whether the source queue is visible.
   */
  toggleQueue() {
    this.showQueue = !this.showQueue;
  }
}
