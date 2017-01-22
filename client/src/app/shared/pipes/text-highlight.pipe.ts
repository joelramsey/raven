import { Pipe, PipeTransform } from '@angular/core';

/**
 * Given a string of text, this class performs a regex replacement on the
 * provided search term (if it exists) and surround each instance of that
 * term with a classed `span` element.
 */
@Pipe({
  name: 'textHighlight'
})
export class TextHighlightPipe implements PipeTransform {

  transform(text: string, search): any {
    
    if (!search) {
      return text;
    }
    
    var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    var regex = new RegExp(pattern, 'gi');
    return search ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }

}
