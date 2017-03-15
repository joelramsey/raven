import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from './accordion/accordion.module';
import { SourcesListModule } from './sources-list/sources-list.module';
import { SourcePillModule } from './source-pill/source-pill.module';
import { EntityCardModule } from './entity-card/entity-card.module';
import { SourcePreviewModule } from './source-preview/source-preview.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';

import {
  AntiAuthGuard,
  AuthGuard,
  HtmlExportService,
  InitialNavigationService,
  ObservableResultHandlerService,
  ProjectDaoService,
  ProjectExportService,
  ResolutionDaoService,
  SearchResultsDeserializerService,
  SourceDaoService,
  SourceSearchService,
  UserDaoService,
  WindowRefService
} from './services/index';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    SourcesListModule,
    SourcePillModule,
    SourcePreviewModule
  ],
  exports: [
    CommonModule,
    AccordionModule,
    EntityCardModule,
    SharedPipesModule,
    SourcePillModule,
    SourcePreviewModule,
    SourcesListModule
  ],
  providers: [
    AntiAuthGuard,
    AuthGuard,
    HtmlExportService,
    InitialNavigationService,
    ObservableResultHandlerService,
    ProjectDaoService,
    ProjectExportService,
    ResolutionDaoService,
    SearchResultsDeserializerService,
    SourceDaoService,
    SourceSearchService,
    UserDaoService,
    WindowRefService
  ]
})
export class SharedModule {
}
