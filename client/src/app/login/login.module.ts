import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { OutputComponent } from '../shared/models/output/output.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LoginRoutingModule,
    // OutputComponent

  ],
  declarations: [
    LoginComponent,
    OutputComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
