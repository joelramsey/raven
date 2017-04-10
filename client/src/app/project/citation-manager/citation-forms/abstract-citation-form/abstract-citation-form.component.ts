export abstract class AbstractCitationFormComponent {

  protected attributes: Array<string> = [];
  protected model: any;

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

    // Set required attributes if they don't already exist
    //
    this.attributes.forEach((attribute: string) => {
      if (typeof this.model[attribute] === 'undefined') {
        this.model[attribute] = '';
      }
    });
  }
}
