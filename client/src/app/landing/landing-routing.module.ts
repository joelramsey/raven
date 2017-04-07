import { NgModule }             from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingRoutes } from './landing.routes';

@NgModule({
  imports: [
    RouterModule.forChild(LandingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LandingRoutingModule { }
