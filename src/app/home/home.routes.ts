import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guard/auth-guard.service';
import { ConfigRoutes } from './config/config.routes';
import { ManageRoutes } from './manage/manage.routes';
import { MonitorRoutes } from './monitor/monitor.routes';
import { LogsRouter } from './logs/logs.routes';
import { DeviceRoutes } from './device/device.routes';
import { UserRoutes } from './user/user.routes';
export const HomeRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'monitor', pathMatch: 'full' },
            ...MonitorRoutes,
            ...ManageRoutes,
            ...ConfigRoutes,
            ...LogsRouter,
            ...DeviceRoutes,
            ...UserRoutes,
        ]
    },
];

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.routes.ts
@time: 2018 / 7 / 2 17: 18

*/

