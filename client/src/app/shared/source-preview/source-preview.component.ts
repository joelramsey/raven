import { Component, OnInit, Input } from '@angular/core';
import { Source } from '../models/index';



@Component({
  selector: 'rvn-source-preview',
  templateUrl: './source-preview.component.html',
  styleUrls: ['./source-preview.component.scss']
})
export class SourcePreviewComponent implements OnInit {

  @Input() source: Source;
  
  constructor() { }

  ngOnInit() {
  }

}
