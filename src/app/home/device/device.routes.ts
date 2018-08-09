import { Route } from '@angular/router';

import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { ClassComponent } from './class/class.component';
import { ProductComponent } from './product/product.component';
import { SurveyComponent } from './survey/survey.component';

import { AuthGuard } from '../../guard/auth-guard.service';

export const DeviceRoutes: Route[] = [
        {
        path: 'device',
        component: DeviceComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'position', pathMatch: 'full' },
                    { path: 'position', component: PositionComponent },
                    { path: 'class', component: ClassComponent },
                    { path: 'product', component: ProductComponent },
                    { path: 'survey', component: SurveyComponent },


                ]
            }
        ]
    }
];
