import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { SimpleNotificationsModule } from 'angular2-notifications/components';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectModule } from '../project/project.module';
import { ProfileModule } from '../profile/profile.module';
import { SourcesModule } from '../sources/sources.module';
import { LandingComponent } from './landing/landing.component';
import { LoggedInToolbarComponent } from './toolbars/logged-in-toolbar/logged-in-toolbar.component';
import { LoggedOutToolbarComponent } from './toolbars/logged-out-toolbar/logged-out-toolbar.component';
import { LoginModule } from '../login/login.module';
import { RegisterModule } from '../register/register.module';
import { LoginDialogComponent } from '../login/login-dialog.component';
import { RegisterDialogComponent } from '../register/register-dialog.component';
import { ProjectStarterModule } from '../project-starter/project-starter.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot(),
    ProjectModule,
    ProjectsModule,
    ProjectStarterModule,
    ProfileModule,
    SourcesModule,
    LoginModule,
    RegisterModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    LandingComponent,
    LoggedInToolbarComponent,
    LoggedOutToolbarComponent
  ],
  exports: [
    MainComponent,
    LandingComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent
  ]
})
export class MainModule { }
