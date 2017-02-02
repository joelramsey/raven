import { Pipe, PipeTransform } from '@angular/core';
import { Source, Resolution, AlchemyConcept, AlchemyEntity } from '../../shared/models/index';
import { DataTableRow } from '../visualizations/data-table/data-table.interface';

@Pipe({
  name: 'tabulateSources'
})
export class TabulateSourcesPipe implements PipeTransform {

  /**
   * Transforms an array of #{@link Source} instances into an array
   * of #{@link DataTableRow} instances based on Alchemy concepts
   * and entities.
   * 
   * @param sources
   * @param resolutions
   * @returns {any}
   */
  transform(sources: Array<Source>, resolutions: Array<Resolution>): Array<DataTableRow> {
  
    if (!sources) {
      return [];
    }

    let synonyms = {};
    let nameEntityMap = {
      'Concept': {}
    };
    
    if (resolutions) {

      // Map resolutions to first entry in the list
      //
      synonyms = resolutions.reduce((map: any, resolution: Resolution) => {
        let terms = resolution.entities.split('|');

        terms.forEach((term: string) => {

          // Map each synonym to first item
          //
          map[term.toLowerCase()] = terms[0].toLowerCase();
        });

        return map;
      }, synonyms);
    }

    sources.forEach((source: Source) => {
      
      if (source.record.result.concepts) {
        source.record.result.concepts.forEach((concept: AlchemyConcept) => {

          let conceptName = concept.text.toLowerCase();
          let resolvedName = conceptName;
          
          // Check for synonyms; if they exist, do resolution
          //
          if (synonyms[conceptName]) {
            resolvedName = synonyms[conceptName];
          }
          
          if (!nameEntityMap['Concept'][resolvedName]) {
            
            // Initialize array if necessary
            //
            nameEntityMap['Concept'][resolvedName] = [];
          }
         
          nameEntityMap['Concept'][resolvedName].push({
            name: concept.text,
            type: 'Concept',
            relevance: concept.relevance,
            alternateNames: [concept.text],
            sources: [source],
            concept: concept
          });
        });
      }
      
      if (source.record.result.entities) {
        source.record.result.entities.forEach((entity: AlchemyEntity) => {

          let entityName = entity.text.toLowerCase();
          let resolvedName = entityName;
          
          if (!nameEntityMap[entity.type]) {

            // Initialize hash if necessary
            //
            nameEntityMap[entity.type] = {};
          }
       
          // Check for synonyms; if they exist, do resolution
          //
          if (synonyms[entityName]) {
            resolvedName = synonyms[entityName];
          }
          
          if (!nameEntityMap[entity.type][resolvedName]) {

            // Initialize array if necessary
            //
            nameEntityMap[entity.type][resolvedName] = [];
          }

          nameEntityMap[entity.type][resolvedName].push({
            name: entity.text,
            type: entity.type,
            sentiment: entity.sentiment.type,
            relevance: entity.relevance,
            alternateNames: [entity.text],
            sources: [source],
            entity: entity
          });
        });
      }
    });
 
    // Re-hydrate into deconflicted list
    //
    return Object.keys(nameEntityMap).reduce((rows: Array<DataTableRow>, type: string) => {
      
      Object.keys(nameEntityMap[type]).forEach((key: string) => {
        
        let conflictingEntities: Array<DataTableRow> = nameEntityMap[type][key];
       
        // If there are multiple entities at this point, deconflict. Otherwise, push!
        //
        if (conflictingEntities.length > 1) {
          rows.push(this.deconflict(type, conflictingEntities));
        } else {
          rows.push(conflictingEntities[0]);
        }
      });
      
      return rows;
    }, []);
  }

  private deconflict(type: string, entities: Array<DataTableRow>): DataTableRow {
    
    let alternateNames: Array<string> = [];
    let sentiments: Array<string> = [];
    let sources: Array<Source> = [];
    let totalCount: number = 0;
    let totalRelevance: number = 0;
    let isConcept = type.toLowerCase() === 'concept';
    
    let deconflictedRow: DataTableRow = entities.reduce((result: DataTableRow, entity: DataTableRow) => {
     
      // Merge alternate names
      //
      entity.alternateNames.forEach((name: string) => {
        if (alternateNames.indexOf(name) === -1) {
          alternateNames.push(name);
        }
      });
      
      // Merge sources
      //
      entity.sources.forEach((source: Source) => {
        if (sources.indexOf(source) === -1) {
          sources.push(source);
        }
      });
      
      // Merge count, if applicable
      //
      if (!isConcept) {
        totalCount += parseInt(entity.entity.count);
      }
      
      // Merge sentiments
      if (sentiments.indexOf(entity.sentiment) === -1) {
        sentiments.push(entity.sentiment);
      }
      
      // Merge relevance
      //
      totalRelevance += entity.relevance ? parseFloat(entity.relevance) : 0;
      
      return result;
    }, {
      name: entities[0].name,
      type: type,
      entity: entities[0].entity,
      concept: entities[0].concept,
      count: 0
    });
  
    // Set merged attributes
    //
    deconflictedRow.entities = entities;
    deconflictedRow.sources = sources;
    deconflictedRow.alternateNames = alternateNames;
    deconflictedRow.sentiment = sentiments.join(',');
    deconflictedRow.relevance = totalRelevance/entities.length === 0 ?
      'N/A': 
      (totalRelevance/entities.length).toFixed(6).toString();

    if (!isConcept) {
      deconflictedRow.entity.count = totalCount.toString();
      deconflictedRow.count = totalCount.toString();
    }
   
    return deconflictedRow;
  }
}
