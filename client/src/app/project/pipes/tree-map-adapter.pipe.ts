import { Pipe, PipeTransform } from '@angular/core';
import { Source } from '../../shared/models/index';
import { AlchemyEntity } from '../../shared/models/record.interface';
import { TreeMapDatum } from '../visualizations/tree-map/tree-map-datum.interface';

@Pipe({
  name: 'toTreeMap'
})
export class TreeMapAdapterPipe implements PipeTransform {

  /**
   * Transforms an array of #{@link Source} instances into an array
   * of #{@link DataTableRow} instances based on Alchemy concepts
   * and entities.
   *
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: Array<Source>, args?: any): TreeMapDatum {

    let types: Array<string> = [];
    let typeIndexMap: any = {
      
    };
    
    let result: TreeMapDatum = {
      name: 'root',
      children: []
    };
    
    if (!value) {
      return result;
    }
    
    value.reduce((rows: Array<TreeMapDatum>, source: Source) => {
    
      // If no record, return immediately
      //
      if (!source.record) {
        return rows;
      }
    
      if (source.record.result.entities) {
        source.record.result.entities.forEach((entity: AlchemyEntity) => {
         
          if (types.indexOf(entity.type) === -1) {
            
            // Add to map
            //
            types.push(entity.type);
            typeIndexMap[entity.type] = Object.keys(typeIndexMap).length;
            
            rows.push({
              name: entity.type,
              children: []
            });
          }
        
          // Add
          //
          rows[typeIndexMap[entity.type]].children.push({
            name: entity.text,
            size: parseInt(entity.count),
            entity: entity
          });
        });
      }
    
      return rows;
    }, result.children);
   
    return result;
  }

}
