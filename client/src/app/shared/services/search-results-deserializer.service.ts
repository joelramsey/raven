import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchResult } from '../models/index';

@Injectable()
export class SearchResultsDeserializerService {

  constructor() {
  }

  public deserialize(response: Response): Observable<SearchResult> {

    let rawData: any = response.json();

    let facetMap: any = {
      subject: [],
      type: []
    };

    return Observable.of({
      results: rawData.map(datum => {

        let metadata: any = datum['text']['metadata'];

        // Generate facets
        //
        let flattenedSubjects = this._flattenSubjects(metadata['dc:subject']);

        // Add to general facet map
        //
        flattenedSubjects.forEach((subject: string) => {
          if (facetMap.subject.indexOf(subject) === -1) {
            facetMap.subject.push(subject);
          }
        });


        // Types can be an array...
        //
        let flattenedTypes = this._flattenTypes(metadata['dc:type']);

        // Add to general facet map
        //
        flattenedTypes.forEach((type: string) => {
          if (facetMap.type.indexOf(type) === -1) {
            facetMap.type.push(type);
          }
        });



        // Map data
        //
        return {
          title: metadata['dc:title'],
          description: metadata['dc:description'],
          sourceUrl: 'http://files.eric.ed.gov/fulltext/' + metadata['dc:identifier']['content'] + '.pdf',
          citation: metadata['eric:citation'],
          facets: [
            {
              type: 'nominal',
              label: 'subject',
              values: flattenedSubjects
            },
            {
              type: 'nominal',
              label: 'type',
              values: flattenedTypes
            },
            {
              type: 'boolean',
              label: 'peer reviewed',
              values: [metadata['eric:peer_reviewed'] === 'T']
            }
          ]
        }
      }),
      facets: Object.keys(facetMap).reduce((res, key) => {
        res.push({
          label: key,
          values: facetMap[key],
          type: 'nominal'
        });

        return res;
      }, [{
        label: 'peer reviewed',
        values: [true, false],
        type: 'boolean'
      }])
    });
  }

  private _flattenSubjects(subjects: any) {

    return subjects.map((subject) => {

      if (typeof subject === 'string') {
          return subject;
      }
      else if (subject['content']) {
          return subject['content'];
      }
    });

  }

  private _flattenTypes(types: any) {
    return types instanceof Array ? types : [types];
  }
}
