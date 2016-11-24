import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' }
      // ...NotFoundRoutes
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
