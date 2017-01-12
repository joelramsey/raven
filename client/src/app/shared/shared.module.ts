import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesListModule } from './sources-list/sources-list.module';
import { SourcePillModule } from './source-pill/source-pill.module';
import { EntityCardModule } from './entity-card/entity-card.module';

import {
  ProjectDaoService,
  UserDaoService,
  SourceDaoService,
  ProjectExportService,
  ObservableResultHandlerService,
  InitialNavigationService,
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
    SourcePillModule,
    EntityCardModule
  ],
  providers: [
    ProjectDaoService,
    SourceDaoService,
    UserDaoService,
    ProjectExportService,
    ObservableResultHandlerService,
    InitialNavigationService,
    AuthGuard,
    AntiAuthGuard
  ]
})
export class SharedModule {
}
