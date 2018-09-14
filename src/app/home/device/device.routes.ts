import { Route } from '@angular/router';

import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { DevicesComponent } from './devices/devices.component';
import { ProductComponent } from './product/product.component';


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
                    { path: 'devices', component: DevicesComponent },
                    { path: 'product', component: ProductComponent },


                ]
            }
        ]
    }
];
