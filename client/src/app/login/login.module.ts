import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialModule, MdDialogModule,
  MdButtonModule, MdIconModule
} from '@angular/material';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdDialogModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    LoginComponent,
    LoginDialogComponent
  ],
  exports: [
    LoginComponent,
    LoginDialogComponent
  ]
})
export class LoginModule { }
