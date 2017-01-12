import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { EntityCardComponent } from './entity-card.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule
  ],
  declarations: [
    EntityCardComponent
  ],
  exports: [
    EntityCardComponent
  ]
})
export class EntityCardModule {
}
