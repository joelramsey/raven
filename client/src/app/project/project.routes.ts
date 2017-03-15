import { Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { SourceUploaderComponent } from './source-uploader/source-uploader.component';
import { ProjectSourceComponent } from './project-source/project-source.component';
import { DataTableComponent } from './visualizations/data-table/data-table.component';
import { LinkDiagramComponent } from './visualizations/link-diagram/link-diagram.component';
import { TreeMapComponent } from './visualizations/tree-map/tree-map.component';
import { SourceSearchComponent } from './source-search/source-search.component';


export const ProjectRoutes:Routes = [
  {
    path: 'project/new',
    component: ProjectComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    children: [
      {
        path:'table',
        component: DataTableComponent
      },
      {
        path:'link',
        component: LinkDiagramComponent
      },
      {
        path:'treemap',
        component: TreeMapComponent
      },
      {
        path: 'search',
        component: SourceSearchComponent
      }
    ]
   },
  {
    path: 'project/:id/sources',
    component: ProjectSourceComponent,
    children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: SourceUploaderComponent }
    ]
  }
];
