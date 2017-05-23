import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialModule, MdDialogModule,
  MdButtonModule, MdIconModule
} from '@angular/material';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { RegisterDialogComponent } from './register-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule
  ],
  declarations: [
    RegisterComponent,
    RegisterDialogComponent
  ],
  exports: [
    RegisterComponent,
    RegisterDialogComponent
  ]
})
export class RegisterModule { }
