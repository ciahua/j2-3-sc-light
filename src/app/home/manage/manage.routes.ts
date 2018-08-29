import { Route } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ContainerComponent } from './container/container.component';
import { StorageRoutes } from './storage/storage.routes';
import { ContainerRoutes } from './container/container.routes';
export const ManageRoutes: Route[] = [

    {
        path: 'manage',
        component: ManageComponent,
        // children: [
        //     { path: '', redirectTo: 'storage', pathMatch: 'full' },
        //     ...StorageRoutes,
        //     { path: 'container', component: ContainerComponent },
        // ]
    }
];
