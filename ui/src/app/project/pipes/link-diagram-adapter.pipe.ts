import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../../shared/models/index';
import { DataTableRow } from '../visualizations/data-table/data-table.interface';
import {
  AlchemyConcept, AlchemyEntity, AlchemyTypedRelation,
  AlchemyArgumentEntity, AlchemyRelationArgument
} from '../../shared/models/record.interface';
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
    
    let nodeIds: Array<number> = [];
    
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

          relation.arguments.forEach((argument: AlchemyRelationArgument) => {
            
            argument.entities.forEach((entity: AlchemyArgumentEntity) => {
              
              let id: number = parseInt(entity.id.substr(2));
              
              // If node doesn't exist, add it
              //
              if (nodeIds.indexOf(id) === -1) {
                nodeIds.push(id);              
                result.nodes.push({
                  name: entity.text,
                  group: id
                });
              }
            });
            
          });
          
          // Create link - a bit magic number-y, but eso si que es
          //
          result.links.push({
            source: parseInt(relation.arguments[0].entities[0].id.substr(2)),
            target: parseInt(relation.arguments[1].entities[0].id.substr(2)),
            value: Math.floor(parseFloat(relation.score) * 10)
          });
          
          console.log(JSON.stringify({
            source: parseInt(relation.arguments[0].entities[0].id.substr(2)),
            target: parseInt(relation.arguments[1].entities[0].id.substr(2)),
            value: Math.floor(parseFloat(relation.score) * 10)
          }));
        });
      }
      
      return res;
    }, result);

    console.log(JSON.stringify(result.nodes));
    return result;
  }
}
