import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../../shared/models/index';
import { DataTableRow } from '../visualizations/data-table/data-table.interface';
import { AlchemyConcept, AlchemyEntity, AlchemyTypedRelation } from '../../shared/models/record.interface';
import { LinkDiagramDatum } from '../visualizations/link-diagram/link-diagram-datum.interface';

@Pipe({
  name: 'toLinkDiagram'
})
export class LinkDiagramAdapterPipe implements PipeTransform {

  /**
   * Transforms an array of #{@link Source} instances into an array
   * of #{@link DataTableRow} instances based on Alchemy concepts
   * and entities.
   *
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: Array<Source>, args?: any): LinkDiagramDatum {

    let result: LinkDiagramDatum = {
      nodes: [],
      links: []
    };
    
    
    if (!value) {
      return result;
    }
    
    value.reduce((res: LinkDiagramDatum, source: Source) => {
    
      // If no record, return immediately
      //
      if (!source.record) {
        return res;
      }
    
      if (source.record.result.typedRelations) {
        source.record.result.typedRelations.forEach((relation: AlchemyTypedRelation) => {
          // rows.push({
          //   name: relation.text,
          //   type: 'Relation',
          //   relevance: relation.relevance
          // })
        });
      }
    
      if (source.record.result.entities) {
        source.record.result.entities.forEach((entity: AlchemyEntity) => {
          
          // rows.push({
          //   name: entity.text,
          //   type: entity.type,
          //   sentiment: entity.sentiment.type
          // })
        });
      }
    
      return res;
    }, result);
    
    return result;
  }
}
