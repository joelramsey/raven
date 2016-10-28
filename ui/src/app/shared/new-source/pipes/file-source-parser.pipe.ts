import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Source } from '../../models/index';

@Pipe({
  name: 'fileSourceParser'
})
@Injectable()
export class FileSourceParserPipe implements PipeTransform {

  transform(value: Array<Source>, args: Array<any>): any {
    
    if (!value || !args) {
      return [];
    }
    
    return args.reduce((sources: Array<Source>, file: any) => {
      debugger;
      sources.push({
        type: 'file',
        title: file.alias,
        content: file
      });
      
      return sources;
    }, value);
  }

}
