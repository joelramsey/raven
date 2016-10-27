import { Component, OnInit, Input } from '@angular/core';

import { Source } from '../models/source.interface';

@Component({
  selector: 'rvn-source-pill',
  templateUrl: './source-pill.component.html',
  styleUrls: ['./source-pill.component.scss']
})
export class SourcePillComponent implements OnInit {

  @Input() source: Source;
  
  constructor() { }

  ngOnInit() {
  }

}
