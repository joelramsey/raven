import { Component, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Source } from '../models/index';

const URL: string = '/api/fribble';

@Component({
  selector: 'rvn-new-source',
  templateUrl: './new-source.component.html',
  styleUrls: ['./new-source.component.scss']
})
export class NewSourceComponent {

  @Output() public created: EventEmitter<Source> = new EventEmitter<Source>();
  @Output() public done: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public cancelled: EventEmitter<any> = new EventEmitter<any>();
  
  public uploader: FileUploader = new FileUploader({url: URL});
  public fileOver: boolean = false;
  
  rawSources: string = '';
  
  constructor() {
  }
  
  fileOverBase($event: boolean) {
    this.fileOver = $event;
    console.log(this.uploader.queue);
  }
}
