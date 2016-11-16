import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../../models/index';

@Pipe({
  name: 'sourceConcat'
})
export class SourceConcatPipe implements PipeTransform {

  constructor() {
  }
  
  transform(value: Array<Source>, args: Array<Source>): Array<Source> {
    if (!value) {
      return [];
    }

    // Return original reference if no new entries
    //
    if (!args || args.length === 0) {
      return value;
    }
   
    // Concat arrays
    //
    return value.concat(args);
  }

}
