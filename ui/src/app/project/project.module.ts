import { NgModule } from '@angular/core';
import { MdCardModule, MdIconModule } from '@angular/material';
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

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdIconModule,
    Angular2DataTableModule,
    NgGridModule
  ],
  declarations: [
    ProjectComponent,
    ProjectViewComponent,
    TabulateSourcesPipe,
    TreeMapComponent,
    DataTableComponent,
    LinkDiagramComponent
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
