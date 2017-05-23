import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
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
