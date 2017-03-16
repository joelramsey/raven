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
        metadata['dc:subject'].forEach((subject: string) => {
          if (facetMap.subject.indexOf(subject) === -1) {
            facetMap.subject.push(subject);
          }
        });

        // Types can be an array...
        //
        if (metadata['dc:type'] instanceof Array) {
          metadata['dc:type'].forEach((type: string) => {
            if (facetMap.type.indexOf(type) === -1) {
              facetMap.type.push(type);
            }
          });
        } else {
          if (facetMap.type.indexOf(metadata['dc:type']) === -1) {
            facetMap.type.push(metadata['dc:type']);
          }
        }

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
              values: metadata['dc:subject']
            },
            {
              type: 'nominal',
              label: 'type',
              values: (metadata['dc:type'] instanceof Array) ?
                metadata['dc:type'] :
                [metadata['dc:type']]
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
      }, [])
    });
  }
}
