import { Component, OnInit, Input } from '@angular/core';

import { EntityCardModel } from '../models/index';

@Component({
  selector: 'rvn-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss']
})
export class EntityCardComponent implements OnInit {

  @Input() public entity: EntityCardModel;
  
  constructor() { }

  ngOnInit() {
  }

}
