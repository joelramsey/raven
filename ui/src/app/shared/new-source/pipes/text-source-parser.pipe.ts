import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Source } from '../../models/index';

const linkRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

@Pipe({
  name: 'textSourceParser'
})
@Injectable()
export class TextSourceParserPipe implements PipeTransform {


  transform(value:string, args?:any):{ linkSources: Array<Source>, textSources: Array<Source> } {
   
    if (!value || !value.length) {
      return {
        linkSources: [],
        textSources: []
      };
    }
    
    let lines:Array<string> = value.split('\n');
    let linkLines:Array<number> = [];

    let linkSources:Array<Source> = [];
    let textSources:Array<Source> = [];

    // Get matching URL indices
    //
    lines.forEach((line:string, i:number) => {
      if (line.match(linkRegex)) {
        linkLines.push(i);
      }
    });
    
    // Edge case (text at beginning)
    //
    if (!linkLines.length && value.length) {
      
      // Get either entire document, or until the first URL
      //
      let content = lines.slice(0, lines.length);

      // Create if applicable
      //
      this._createTextSource(content, textSources);
    }

    // Handle main cases (e.g., URL at beginning or end)
    //
    linkLines.reduce((previousIndex:number, currentIndex:number) => {
      
      if (currentIndex > 0 && currentIndex - previousIndex > 1) {
        
        let content = lines.slice(
          previousIndex === 0 ? 0 : previousIndex + 1,
          currentIndex
        );
   
        // Create if applicable
        //
        this._createTextSource(content, textSources);
      }
      
      linkSources.push({
        id: null,
        type: 'url',
        content: lines[currentIndex],
        title: this._extractDomain(lines[currentIndex])
      });

      return currentIndex;
    }, 0);

    // Edge case (text at end, with link before)
    //
    if (linkLines.length && linkLines[linkLines.length - 1] < lines.length - 1) {

      // Get last bit of document
      //
      let content = lines.slice(linkLines[linkLines.length - 1] + 1, lines.length);

      // Create if applicable
      //
      this._createTextSource(content, textSources);
    }
    
    return {
      linkSources: linkSources,
      textSources: textSources
    };
  }

  private _extractDomain(url:string):string {

    let domain:string;

    // Find & remove protocol (http, ftp, etc.) and get domain
    //
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    }
    else {
      domain = url.split('/')[0];
    }

    // Find & remove port number
    //
    domain = domain.split(':')[0];

    return domain;
  }
  
  private _createTextSource(content: Array<string>, textSources: Array<Source>) {
    
    // Check if we have content
    //
    let text:string = content.join('\n').trim();

    if (text.length > 0) {

      let title: string;

      content.some((line: string) => {
        if (line.trim() === '') {
          return false;
        }

        title = line;
        return true;
      });

      textSources.push({
        id: null,
        title: title,
        type: 'text',
        content: text
      });
    }
  }
}
