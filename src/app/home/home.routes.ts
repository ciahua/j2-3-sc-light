import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guard/auth-guard.service';
import { MonitorRoutes } from './monitor/monitor.routes';

import { DeviceRoutes } from './device/device.routes';
import { UserRoutes } from './user/user.routes';
import { RuleRoutes } from './rule/rule.routes';

import { ApplicationRoutes } from './application/application.routes';
import { EnergyRoutes } from './energy/energy.routes';
import { DashbordRoutes } from './dashbord/dashbord.routes';
import { HomepageRoutes } from './homepage/homepage.routes';
import { StrategyRoutes } from './strategy/strategy.routes';
import { AirreportRoutes } from './airreport/airreport.routes';
import { VideoRoutes } from './video/video.routes';
import { MapRoutes } from './map/map.routes';
import { ManageRoutes } from './manage/manage.routes';
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
            ...RuleRoutes,
            ...EnergyRoutes,
            ...DashbordRoutes,
            ...HomepageRoutes,
            ...StrategyRoutes,
            ...AirreportRoutes,
            ...VideoRoutes,
            ...MapRoutes,
            ...ManageRoutes
        ]
    },
];

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.routes.ts
@time: 2018 / 7 / 2 17: 18

*/

