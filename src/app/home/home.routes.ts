import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guard/auth-guard.service';
import { MonitorRoutes } from './monitor/monitor.routes';

import { DeviceRoutes } from './device/device.routes';
import { UserRoutes } from './user/user.routes';

import { ApplicationRoutes } from './application/application.routes';
import { DashbordRoutes } from './dashbord/dashbord.routes';
import { HomepageRoutes } from './homepage/homepage.routes';
import { StrategyRoutes } from './strategy/strategy.routes';
import { AirreportRoutes } from './airreport/airreport.routes';

import { EchartMapRoutes } from './echart-map/echart-map.routes';
import { MapRoutes } from './map/map.routes';
import { EchartRoutes } from './echart/echart.routes';
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
            { path: '', redirectTo: 'homepage', pathMatch: 'full' },
            ...MonitorRoutes,
            ...DeviceRoutes,
            ...UserRoutes,
            ...ApplicationRoutes,
            ...DashbordRoutes,
            ...HomepageRoutes,
            ...StrategyRoutes,
            ...AirreportRoutes,
            ...MapRoutes,
            ...EchartRoutes,
            ...EchartMapRoutes
        ]
    },
];

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.routes.ts
@time: 2018 / 7 / 2 17: 18

*/

