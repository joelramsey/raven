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
      type: [],
      language: []
    };

    return Observable.of({
      results: rawData.map(datum => {

        let metadata: any = datum['text']['metadata'];
        let language: any = metadata['dc:language'];

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
        let flattenedTypes = this._flattenGeneric(metadata['dc:type']);

        // Add to general facet map
        //
        flattenedTypes.forEach((type: string) => {
          if (facetMap.type.indexOf(type) === -1) {
            facetMap.type.push(type);
          }
        });

        // Languages can be an array...
        //
        let flattenedLanguages = this._flattenGeneric(metadata['dc:language']);

        // Add to general facet map
        //
        flattenedLanguages.forEach((language: string) => {
          if (facetMap.language.indexOf(language) === -1) {
            facetMap.language.push(language);
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
              value: flattenedSubjects
            },
            {
              type: 'nominal',
              label: 'type',
              value: flattenedTypes
            },
            {
              type: 'boolean',
              label: 'peer reviewed',
              value: [metadata['eric:peer_reviewed'] === 'T']
            },
            {
              type: 'nominal',
              label: 'language',
              value: flattenedLanguages
            }
          ]
        }
      }),
      facets: Object.keys(facetMap).reduce((res, key) => {
        res.push({
          label: key,
          value: facetMap[key],
          type: 'nominal'
        });

        return res;
      }, [{
        label: 'peer reviewed',
        value: [true, false],
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

  private _flattenGeneric(types: any) {
    return types instanceof Array ? types : [types];
  }
}
