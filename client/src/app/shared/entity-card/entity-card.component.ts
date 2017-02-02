import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdButtonToggleChange } from '@angular/material';

import { EntityCardModel } from '../models/index';

@Component({
  selector: 'rvn-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss']
})
export class EntityCardComponent implements OnInit {

  @Input() public entity: EntityCardModel;
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();
  private _alternateName: string;
  
  constructor() { }

  ngOnInit() {
  }


  /**
   * Returns the entity's weight or size, which are indicators of
   * the number of occurrences of the entity.
   * @returns {any}
   */
  get entityCount(): string|number {

    if (this.entity) {
      return this.entity.count || 'N/A';
    }
    
    return null;
  }

  /**
   * Returns the entity's type.
   * @returns {any}
   */
  get entityType(): string {

    if (this.entity) {
      return this.entity.type;
    }

    return '';
  }

  /**
   * Returns the current alternate name if it's defined; returns
   * the entity's name otherwise.
   * 
   * @returns {any}
   */
  get alternateName(): string {

    if (this.entity) {
      return this._alternateName ? this._alternateName : this.entity.name;
    }

    return '';
  }
  
  /**
   * Returns the current alternate name if it's defined; returns
   * the entity's name otherwise.
   *
   * @returns {any}
   */
  get showAlternateNames(): boolean {

    if (this.entity && this.entity.alternateNames) {
      return this.entity.alternateNames.length > 1;
    }
    
    return false;
  }

  /**
   * Updates the currently selected alternate name.
   * @param $event
   */
  updateAlternateName($event: MdButtonToggleChange) {
    this._alternateName = $event.value;
  }
}
