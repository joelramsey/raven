import { NgModule } from '@angular/core';
import { MdCardModule, MdIconModule, MdInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdInputModule,
    MdIconModule
  ],
  declarations: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
