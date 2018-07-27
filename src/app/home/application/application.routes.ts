import { Route } from '@angular/router';
import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';
import { ApplicationComponent } from './application.component';

import { AuthGuard } from '../../guard/auth-guard.service';

export const ApplicationRoutes: Route[] = [
    {
        path: 'application',
        component: ApplicationComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'cover', pathMatch: 'full' },
                    { path: 'cover', component: CoverComponent },
                    { path: 'calamity', component: CalamityComponent },

                ]
            }
        ]
    }
];
