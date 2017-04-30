import { EventEmitter } from '@angular/core';

import { SourceData } from '../../../../shared/models/index';

export abstract class AbstractCitationFormComponent {

  protected attributes: Array<string> = [];
  protected model: any;
  protected publishData: EventEmitter<any>;
  sourceData: SourceData;

  protected months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  /**
   * Sets model attributes which are undefined.
   */
  protected setAttributes() {

    if (!this.model) {
      this.model = {};
    }

    if (!this.sourceData) {
      this.sourceData = {};
    }

    // Set required attributes if they don't already exist
    //
    this.attributes.forEach((attribute: string) => {
      if (typeof this.model[attribute] === 'undefined') {
        this.model[attribute] = '';
      }
    });
  }

  capitalize(str: string) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return '';
    }
  }

  handleSubmit() {
    this.publishData.emit({
      model: this.model,
      sourceData: this.sourceData
    });
  }
}
