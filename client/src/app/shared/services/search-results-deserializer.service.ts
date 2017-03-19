import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchResult, SearchFacet } from '../models/index';

@Injectable()
export class SearchResultsDeserializerService {

  constructor() {
  }

  public ericLabelMap = {
    LANGUAGE: {
      eric: 'dc:language',
      label: 'language',
      type: 'nominal'
    },
    SUBJECT: {
      eric: 'dc:subject',
      label: 'subject',
      type: 'nominal'
    },
    TYPE: {
      eric: 'dc:type',
      label: 'type',
      type: 'nominal'
    },
    EDUCATION_LEVEL: {
      eric: 'dcterms:educationLevel',
      label: 'education level',
      type: 'nominal'
    },
    SPONSOR: {
      eric: 'eric:sponsor',
      label: 'sponsor',
      type: 'nominal'
    },
    AUDIENCE: {
      eric: 'dcterms:audience',
      label: 'audience',
      type: 'nominal'
    },
    FULLTEXT_AVAILABLE: {
      eric: 'dcterms:accessRights',
      label: 'full text available',
      type: 'boolean'
    },
    PEER_REVIEWED: {
      eric: 'eric:peer_reviewed',
      label: 'peer reviewed',
      type: 'boolean'
    }
  };

  public deserialize(response: Response): Observable<SearchResult> {

    let rawData: any = response.json();

    let facetMap: any = {
      'subject': []
    };

    return Observable.of({
      results: rawData.map(datum => {

        let metadata: any = datum['text']['metadata'];

        // Generate facets
        //
        let flattenedSubjects = this._flattenSubjects(metadata[this.ericLabelMap.SUBJECT.eric]);

        // Add to general facet map
        //
        flattenedSubjects.forEach((subject: string) => {
          if (facetMap.subject.indexOf(subject) === -1) {
            facetMap.subject.push(subject);
          }
        });

        // Flatten and add generic cases
        //
        let genericEntryFacets: Array<SearchFacet> = [
          this.ericLabelMap.TYPE,
          this.ericLabelMap.LANGUAGE,
          this.ericLabelMap.EDUCATION_LEVEL,
          this.ericLabelMap.SPONSOR,
          this.ericLabelMap.AUDIENCE
        ]
          .map(facetType => {
            let flattenedGenerics = this._flattenGeneric(metadata[facetType.eric]);

            if (!facetMap[facetType.label]) {
              facetMap[facetType.label] = [];
            }

            // Add to general facet map
            //
            flattenedGenerics.forEach((type: string) => {
              if (facetMap[facetType.label].indexOf(type) === -1) {
                facetMap[facetType.label].push(type);
              }
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
          sourceUrl: 'http://files.eric.ed.gov/fulltext/' + metadata['dc:identifier']['content'] + '.pdf',
          citation: metadata['eric:citation'],
          facets: [
            {
              type: this.ericLabelMap.SUBJECT.type,
              label: this.ericLabelMap.SUBJECT.label,
              value: flattenedSubjects
            },
            {
              type: this.ericLabelMap.PEER_REVIEWED.type,
              label: this.ericLabelMap.PEER_REVIEWED.label,
              value: [metadata[this.ericLabelMap.PEER_REVIEWED.eric] === 'T']
            },
            {
              type: this.ericLabelMap.FULLTEXT_AVAILABLE.type,
              label: this.ericLabelMap.FULLTEXT_AVAILABLE.label,
              value: [metadata[this.ericLabelMap.FULLTEXT_AVAILABLE.eric] === 'Yes']
            },
          ].concat(genericEntryFacets)
        };
      }),
      facets: Object.keys(facetMap).reduce((res, key) => {
        res.push({
          label: key,
          value: facetMap[key],
          type: 'nominal'
        });

        return res;
      }, [
        {
          label: this.ericLabelMap.PEER_REVIEWED.label,
          value: [true, false],
          type: this.ericLabelMap.PEER_REVIEWED.type
        },
        {
          label: this.ericLabelMap.FULLTEXT_AVAILABLE.label,
          value: [true, false],
          type: this.ericLabelMap.FULLTEXT_AVAILABLE.type
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
