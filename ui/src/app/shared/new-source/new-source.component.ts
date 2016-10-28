import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import 'rxjs/add/operator/debounceTime';

import { Source, SourcePillClickEvent } from '../models/index';
import { TextSourceParserPipe } from './pipes/text-source-parser.pipe';

const URL:string = '/api/fribble';

@Component({
  selector: 'rvn-new-source',
  templateUrl: './new-source.component.html',
  styleUrls: ['./new-source.component.scss']
})
export class NewSourceComponent implements OnInit {

  @Output() public created:EventEmitter<Source> = new EventEmitter<Source>();
  @Output() public done:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public cancelled:EventEmitter<any> = new EventEmitter<any>();

  public uploader:FileUploader = new FileUploader({url: URL});
  public fileOver:boolean = false;
  public rawSourcesControl:FormControl = new FormControl();

  // Sources
  //
  public textSources:Array<Source> = [];
  public linkSources:Array<Source> = [];

  private _cachedFileObjects:Array<Source> = [];

  constructor(private _textSourceParserService:TextSourceParserPipe) {
  }

  ngOnInit() {
    this.rawSourcesControl.valueChanges
      .debounceTime(1000)
      .subscribe((rawSources:string) => {
        
        let parsedSources:any  = this._textSourceParserService.transform(rawSources);
        
        this.textSources = parsedSources.textSources;
        this.linkSources = parsedSources.linkSources;
        
        console.log(this.textSources);
      });
  }

  /**
   * Translates an array of file item objects into a list of sources.
   * Checks the current file queue against the cached list to avoid
   * spastic re-renders.
   * 
   * @returns {Array<Source>}
   */
  get fileSources():Array<Source> {

    // Refresh queue if changed
    //
    if (this.uploader.queue.length !== this._cachedFileObjects.length) {
      this._cachedFileObjects = this.uploader.queue.reduce((sources:Array<Source>, fileObject:any) => {
        sources.push({
          type: 'file',
          title: fileObject.file.name,
          content: fileObject
        });

        return sources;
      }, []);
    }

    return this._cachedFileObjects;
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
}
