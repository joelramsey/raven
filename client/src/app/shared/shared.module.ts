import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesListModule } from './sources-list/sources-list.module';
import { SourcePillModule } from './source-pill/source-pill.module';
import {
  ProjectDaoService,
  UserDaoService,
  SourceDaoService,
  ProjectExportService,
  ObservableResultHandlerService,
  AuthGuard,
  AntiAuthGuard
} from './services/index';

@NgModule({
  imports: [
    CommonModule,
    SourcesListModule,
    SourcePillModule
  ],
  exports: [
    CommonModule,
    SourcesListModule,
    SourcePillModule
  ],
  providers: [
    ProjectDaoService,
    SourceDaoService,
    UserDaoService,
    ProjectExportService,
    ObservableResultHandlerService,
    AuthGuard,
    AntiAuthGuard
  ]
})
export class SharedModule {
}
