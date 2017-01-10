import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewSourceModule } from './new-source/new-source.module';
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
    NewSourceModule,
    SourcesListModule,
    SourcePillModule
  ],
  exports: [
    CommonModule,
    NewSourceModule,
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
