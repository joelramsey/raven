import {Route} from '@angular/router';

import { NotFoundComponent } from './not-found.component';

export  const NotFoundRoutes: Route[] = [
    {
        path: '**',
        component: NotFoundComponent
    }
];