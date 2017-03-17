import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MdCardModule, MdIconModule, MdTooltipModule, MdButtonModule,
  MdProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgGridModule } from 'angular2-grid/main';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { TabulateSourcesPipe } from './pipes/tabulate-sources.pipe';
import { TreeMapComponent } from './visualizations/tree-map/tree-map.component';
import { DataTableComponent } from './visualizations/data-table/data-table.component';
import { LinkDiagramComponent } from './visualizations/link-diagram/link-diagram.component';
import { LinkDiagramAdapterPipe } from './pipes/link-diagram-adapter.pipe';
import { TreeMapAdapterPipe } from './pipes/tree-map-adapter.pipe';
import { SourceUploaderModule } from './source-uploader/source-uploader.module';
import { ProjectSourceModule } from './project-source/project-source.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { DraggableDirective } from './directives/index';
import { SourceSearchModule } from './source-search/source-search.module';
import { AvailableFacetComponent } from './available-facet/available-facet.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MdCardModule,
    MdIconModule,
    MdTooltipModule,
    MdProgressSpinnerModule,
    MdButtonModule,
    NgxDatatableModule,
    NgGridModule,
    SourceUploaderModule,
    SourceSearchModule,
    ProjectSourceModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [
    DraggableDirective,
    ProjectComponent,
    ProjectViewComponent,
    TabulateSourcesPipe,
    LinkDiagramAdapterPipe,
    TreeMapAdapterPipe,
    TreeMapComponent,
    DataTableComponent,
    LinkDiagramComponent
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
