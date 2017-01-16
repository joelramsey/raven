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

  get entityCount(): string|number {

    if (this.entity) {
      return this.entity.weight || this.entity.size || 'N/A';
    }
    
    return null;
  }
}
