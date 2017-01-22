import { NgModule } from '@angular/core';

import { TextHighlightPipe } from './index';

@NgModule({
  declarations: [
    TextHighlightPipe
  ],
  exports: [
    TextHighlightPipe
  ]
})
export class SharedPipesModule {
}
