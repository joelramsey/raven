import { NgModule }             from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterRoutes } from './register.routes';

@NgModule({
  imports: [
    RouterModule.forChild(RegisterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRoutingModule { }
