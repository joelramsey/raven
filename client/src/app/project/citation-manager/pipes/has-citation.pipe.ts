import { Pipe, PipeTransform } from '@angular/core';

import { Source } from '../../../shared/models/index';

@Pipe({
  name: 'hasCitation'
})
export class HasCitationPipe implements PipeTransform {

  transform(sources: Array<Source>, hasCitation: boolean): Array<Source> {

    // Force type
    //
    hasCitation = !!hasCitation;

    // Early return
    //
    if (!sources) {
      return [];
    }

    return sources.filter((source: Source) => {
      return (hasCitation === !!source.record.citation);
    });
  }

}
