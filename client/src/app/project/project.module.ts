import { NgModule } from '@angular/core';
import { MdCardModule, MdIconModule, MdTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2DataTableModule } from 'angular2-data-table/release/index';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { TabulateSourcesPipe } from './pipes/tabulate-sources.pipe';
import { TreeMapComponent } from './visualizations/tree-map/tree-map.component';
import { DataTableComponent } from './visualizations/data-table/data-table.component';
import { NgGridModule } from 'angular2-grid/dist/main';
import { LinkDiagramComponent } from './visualizations/link-diagram/link-diagram.component';
import { LinkDiagramAdapterPipe } from './pipes/link-diagram-adapter.pipe';
import { TreeMapAdapterPipe } from './pipes/tree-map-adapter.pipe';
import { SourceUploaderModule } from './source-uploader/source-uploader.module';
import { ProjectSourceModule } from './project-source/project-source.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdIconModule,
    MdTooltipModule,
    Angular2DataTableModule,
    NgGridModule,
    SourceUploaderModule,
    ProjectSourceModule
  ],
  declarations: [
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
