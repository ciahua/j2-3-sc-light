import { Route } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DelDeviceComponent } from './del-device/del-device.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { DeviceComponent } from './device.component';

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
                    { path: '', redirectTo: 'add-device', pathMatch: 'full' },
                    { path: 'add-device', component: AddDeviceComponent },
                    { path: 'new-device', component: NewDeviceComponent },
                    { path: 'del-device', component: DelDeviceComponent },

                ]
            }
        ]
    }
];
