import { Pipe, PipeTransform } from '@angular/core';
import { Source, Resolution, AlchemyEntity } from '../../shared/models/index';
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
   * @param resolutions
   * @returns {any}
   */
  transform(value: Array<Source>, resolutions: Array<Resolution>): TreeMapDatum {

    let types: Array<string> = [];
    let typeIndexMap: any = {};
    let synonyms = {};
    let nameEntityMap = {};
    

    if (resolutions) {

      // Map resolutions to first entry in the list
      //
      synonyms = resolutions.reduce((map: any, resolution: Resolution) => {
        let terms = resolution.entities.split('|');

        terms.forEach((term: string) => {

          // Map each synonym to first item
          //
          map[term] = terms[0];
        });

        return map;
      }, synonyms);
    }
    
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
            nameEntityMap[entity.type] = {};
            
            rows.push({
              name: entity.type,
              children: []
            });
          }
        
          // Add
          //
          let name = synonyms[entity.text] ? synonyms[entity.text] : entity.text;
          
          if (!nameEntityMap[entity.type][name.toLowerCase()]) {
            nameEntityMap[entity.type][name.toLowerCase()] = [];
          }
            
          // No risk of conflict, so just add
          //
          nameEntityMap[entity.type][name.toLowerCase()].push({
            name: entity.text,
            size: parseInt(entity.count),
            entities: [entity],
            type: entity.type,
            sources: [source],
            alternateNames: [entity.text]
          });
        });
      }
    
      return rows;
    }, result.children);

    // Hydrate model with deconflictions
    //
    Object.keys(nameEntityMap).forEach((key: string) => {
      Object.keys(nameEntityMap[key]).forEach((entityName: string) => {
        result.children[typeIndexMap[key]].children.push(this.deconflict(entityName, key, nameEntityMap[key][entityName]));
      });
    });
    
    return result;
  }

  deconflict(entityName: string, type: string, data: Array<TreeMapDatum>): TreeMapDatum {

    // If there's only one, no need to deconflict
    //
    if (data.length == 1) {
      return data[0];
    }

    // Otherwise, let's merge!
    //
    return data.reduce((merged, datum) => {
      
      // Combine size
      //
      merged.size += datum.size;
     
      // Add source
      //
      datum.sources.forEach((source: Source) => {
        if (merged.sources.indexOf(source) == -1) {
          merged.sources.push(source);
        }
      });
      
      // Add entities
      //
      datum.entities.forEach((entity: AlchemyEntity) => {
        if (merged.entities.indexOf(entity) == -1) {
          merged.entities.push(entity);
        }
      });
      
      // Add alternate names
      //
      datum.alternateNames.forEach((name: string) => {
        if (merged.alternateNames.indexOf(name) == -1) {
          merged.alternateNames.push(name);
        }
      });
      
      return merged;
      
    }, {
      name: data[0].name,
      type: type,
      children: [],
      entities: [],
      alternateNames: [],
      size: 1,
      sources: []
    });
  }
}
