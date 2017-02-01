import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../../shared/models/index';

import {
  AlchemyTypedRelation,
  AlchemyArgumentEntity,
  AlchemyRelationArgument
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
  transform(value:Array<Source>, args?:any):LinkDiagramDatum {

    let result:LinkDiagramDatum = {
      nodes: [],
      links: []
    };

    let nodeIds:Array<string> = [];
    let nodeIdIndexMap:any = {};

    if (!value) {
      return result;
    }

    value.reduce((res:LinkDiagramDatum, source:Source) => {

      // If no record, return immediately
      //
      if (!source.record) {
        return res;
      }

      if (source.record.result.typedRelations) {
        source.record.result.typedRelations.forEach((relation:AlchemyTypedRelation) => {

          relation.arguments.forEach((argument:AlchemyRelationArgument) => {

            argument.entities.forEach((entity:AlchemyArgumentEntity) => {

              // If node doesn't exist, add it
              //
              if (nodeIds.indexOf(entity.id) === -1) {
                nodeIds.push(entity.id);
                nodeIdIndexMap[entity.id] = result.nodes.length;
                result.nodes.push({
                  name: entity.text,
                  group: entity.type,
                  type: entity.type,
                  entity: entity,
                  sources: [source],
                  alternateNames: [entity.text]
                });
              }
            });

          });

          // Create link - a bit magic number-y, but eso si que es
          //
          result.links.push({
            source: nodeIdIndexMap[relation.arguments[0].entities[0].id],
            target: nodeIdIndexMap[relation.arguments[1].entities[0].id],
            type: relation.type,
            value: Math.floor(parseFloat(relation.score) * 10)
          });
        });
      }

      return res;
    }, result);

    return result;
  }
}
