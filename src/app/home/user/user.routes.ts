import { Route } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RightComponent } from './right/right.component';
import { UserComponent } from './user.component';

import { AuthGuard } from '../../guard/auth-guard.service';

export const UserRoutes: Route[] = [
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'admin', pathMatch: 'full' },
                    { path: 'admin', component: AdminComponent },
                    { path: 'right', component: RightComponent }

                ]
            }
        ]
    }
];
