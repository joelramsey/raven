import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesListModule } from './sources-list/sources-list.module';
import { SourcePillModule } from './source-pill/source-pill.module';
import { EntityCardModule } from './entity-card/entity-card.module';
import { SourcePreviewModule } from './source-preview/source-preview.module';

import {
  ProjectDaoService,
  UserDaoService,
  SourceDaoService,
  ProjectExportService,
  ObservableResultHandlerService,
  InitialNavigationService,
  WindowRefService,
  AuthGuard,
  AntiAuthGuard
} from './services/index';

@NgModule({
  imports: [
    CommonModule,
    SourcesListModule,
    SourcePillModule,
    SourcePreviewModule
  ],
  exports: [
    CommonModule,
    SourcesListModule,
    SourcePillModule,
    EntityCardModule,
    SourcePreviewModule
  ],
  providers: [
    ProjectDaoService,
    SourceDaoService,
    UserDaoService,
    ProjectExportService,
    ObservableResultHandlerService,
    InitialNavigationService,
    WindowRefService,
    AuthGuard,
    AntiAuthGuard
  ]
})
export class SharedModule {
}
