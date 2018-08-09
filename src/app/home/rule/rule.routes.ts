import { Route } from '@angular/router';

import { RuleComponent } from './rule.component';
import { AlertComponent } from './alert/alert.component';
import { ControlComponent } from './control/control.component';


import { AuthGuard } from '../../guard/auth-guard.service';

export const RuleRoutes: Route[] = [
        {
        path: 'rule',
        component: RuleComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'alert', pathMatch: 'full' },
                    { path: 'alert', component: AlertComponent },
                    { path: 'control', component: ControlComponent },



                ]
            }
        ]
    }
];
