import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../../shared/models/index';
import { DataTableRow } from '../visualizations/data-table/data-table.interface';
import { AlchemyConcept, AlchemyEntity } from '../../shared/models/record.interface';

@Pipe({
  name: 'tabulateSources'
})
export class TabulateSourcesPipe implements PipeTransform {

  /**
   * Transforms an array of #{@link Source} instances into an array
   * of #{@link DataTableRow} instances based on Alchemy concepts
   * and entities.
   * 
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: Array<Source>, args?: any): Array<DataTableRow> {
  
    if (!value) {
      return [];
    }

    return value.reduce((rows: Array<DataTableRow>, source: Source) => {
      
      // If no record, return immediately
      //
      if (!source.record) {
        return rows;
      }
      
      if (source.record.result.concepts) {
        source.record.result.concepts.forEach((concept: AlchemyConcept) => {
          rows.push({
            name: concept.text,
            type: 'Concept',
            relevance: concept.relevance
          })
        });
      }
      
      if (source.record.result.entities) {
        source.record.result.entities.forEach((entity: AlchemyEntity) => {
          rows.push({
            name: entity.text,
            type: entity.type,
            sentiment: entity.sentiment.type
          })
        });
      }
      
      return rows;
    }, []);
  }

}
