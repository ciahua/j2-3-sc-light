import { Route } from '@angular/router';
import { ContainerComponent } from './container.component';

export const ContainerRoutes: Route[] = [
    {
        path: '',
        component: ContainerComponent
    }
];

//
// import { Routes } from '@angular/router';
//
// import { ConfigRoutes } from './config/index';
// import { ManageRoutes } from './manage/index';
//
// export const routes: Routes = [
//   ...ManageRoutes,
//   ...ConfigRoutes
// ];
