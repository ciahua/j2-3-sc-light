import { Route } from '@angular/router';
import { LicenseSystemComponent } from './license-system/license-system.component';
import { UserSystemComponent } from './user-system/user-system.component';

import { ConfigComponent } from './config.component';

export const ConfigRoutes: Route[] = [
    {
        path: 'config',
        component: ConfigComponent,
        // children: [
        //     { path: '', redirectTo: 'user', pathMatch: 'full' },
        //     { path: 'user', component: UserSystemComponent },
        //     { path: 'licence', component: LicenseSystemComponent },

        // ]
    }
];
