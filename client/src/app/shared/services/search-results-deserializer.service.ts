import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchResult, SearchFacet, SearchConstants } from '../models/index';

@Injectable()
export class SearchResultsDeserializerService {

  constructor() {
  }


  public deserialize(response: Response): Observable<SearchResult> {

    let rawData: any = response.json();

    if(!rawData) {
      return Observable.throw('Response must not be null.');
    }

    let facetMap: any = {
      'subject': {
        items: [],
        count: {}
      }
    };

    return Observable.of({
      results: rawData.map(datum => {

        let metadata: any = datum['text']['metadata'];

        // Generate facets
        //
        let flattenedSubjects = this._flattenSubjects(metadata[SearchConstants.ERIC_LABEL_MAP.SUBJECT.eric]);

        // Add to general facet map
        //
        flattenedSubjects.forEach((subject: string) => {
          if (facetMap.subject.items.indexOf(subject) === -1) {
            facetMap.subject.items.push(subject);
          }

          if (!facetMap.subject.count[subject]) {
            facetMap.subject.count[subject] = 0;
          }

          facetMap.subject.count[subject] += 1;
        });

        // Flatten and add generic cases
        //
        let genericEntryFacets: Array<SearchFacet> = [
          SearchConstants.ERIC_LABEL_MAP.TYPE,
          SearchConstants.ERIC_LABEL_MAP.LANGUAGE,
          SearchConstants.ERIC_LABEL_MAP.EDUCATION_LEVEL,
          SearchConstants.ERIC_LABEL_MAP.SPONSOR,
          SearchConstants.ERIC_LABEL_MAP.AUDIENCE
        ]
          .map(facetType => {
            let flattenedGenerics = this._flattenGeneric(metadata[facetType.eric]);

            if (!facetMap[facetType.label]) {
              facetMap[facetType.label] = {
                items: [],
                count: {}
              };
            }

            // Add to general facet map
            //
            flattenedGenerics.forEach((type: string) => {
              if (facetMap[facetType.label].items.indexOf(type) === -1) {
                facetMap[facetType.label].items.push(type);
              }

              if (!facetMap[facetType.label].count[type]) {
                facetMap[facetType.label].count[type] = 0;
              }

              facetMap[facetType.label].count[type] += 1;
            });

            return {
              label: facetType.label,
              type: facetType.type,
              value: flattenedGenerics
            };
          });


        // Map data
        //
        return {
          title: metadata['dc:title'],
          description: metadata['dc:description'],
          sourceUrl: metadata[SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.eric] === 'Yes' &&
                     metadata['dc:identifier']['content'] ?
                       'http://files.eric.ed.gov/fulltext/' + metadata['dc:identifier']['content'] + '.pdf':
                        null,
          citation: metadata['eric:citation'],
          facets: [
            {
              type: SearchConstants.ERIC_LABEL_MAP.SUBJECT.type,
              label: SearchConstants.ERIC_LABEL_MAP.SUBJECT.label,
              value: flattenedSubjects
            },
            {
              type: SearchConstants.ERIC_LABEL_MAP.PEER_REVIEWED.type,
              label: SearchConstants.ERIC_LABEL_MAP.PEER_REVIEWED.label,
              value: [metadata[SearchConstants.ERIC_LABEL_MAP.PEER_REVIEWED.eric] === 'T']
            },
            {
              type: SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.type,
              label: SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.label,
              value: [
                metadata[SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.eric] === 'Yes' &&
                metadata['dc:identifier']['content']
              ]
            },
          ].concat(genericEntryFacets)
        };
      }),
      facets: Object.keys(facetMap).reduce((res, key): Array<any> => {
        res.push({
          label: key,
          value: facetMap[key].items,
          count: facetMap[key].count,
          type: 'nominal'
        });

        return res;
      }, [
        {
          label: SearchConstants.ERIC_LABEL_MAP.PEER_REVIEWED.label,
          value: [true, false],
          type: SearchConstants.ERIC_LABEL_MAP.PEER_REVIEWED.type,
          count: {}
        },
        {
          label: SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.label,
          value: [true, false],
          type: SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.type,
          count: {}
        }
      ])
    });
  }

  private _flattenSubjects(subjects: any) {

    if (!subjects) {
      return [];
    }

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
    if (!types) {
      return [];
    }

    return types instanceof Array ? types : [types];
  }
}
