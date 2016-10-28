import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Source } from '../../models/index';

const linkRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

@Pipe({
  name: 'textSourceParser'
})
@Injectable()
export class TextSourceParserPipe implements PipeTransform {


  transform(value:string, args?:any):{ linkSources: Array<Source>, textSources: Array<Source> } {
    
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
    if (!linkLines.length) {
      
      // Get either entire document, or until the first URL
      //
      let content = lines.slice(0, lines.length);
      
      textSources.push({
        title: content[0],
        type: 'text',
        content: content.join('\n')
      });
    }

    // Handle main cases (e.g., URL at beginning or end
    //
    linkLines.reduce((previousIndex:number, currentIndex:number) => {
      
      if (currentIndex > 0 && currentIndex - previousIndex > 1) {
        
        let content = lines.slice(
          previousIndex === 0 ? 0 : previousIndex + 1,
          previousIndex === 0 ? currentIndex + 1 : currentIndex
        );
        
        textSources.push({
          title: content[0],
          type: 'text',
          content: content.join('\n')
        });
      }
      
      linkSources.push({
        type: 'url',
        content: lines[currentIndex],
        title: this._extractDomain(lines[currentIndex])
      });

      return currentIndex;
    }, 0);

    // Edge case (text at end, with link before)
    //
    if (linkLines.length && linkLines[linkLines.length - 1] < lines.length - 1) {

      // Get either entire document, or until the first URL
      //
      let content = lines.slice(linkLines[linkLines.length - 1] + 1, lines.length);

      textSources.push({
        title: content[0],
        type: 'text',
        content: content.join('\n')
      });
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
}
