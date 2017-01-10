import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Source } from '../../../shared/models/index';

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
      sources.push({
        id: null,
        type: 'file',
        title: file.alias,
        visible: true,
        content: file
      });
      
      return sources;
    }, value);
  }

}
