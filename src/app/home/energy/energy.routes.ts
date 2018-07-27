import { Route } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { SurveyComponent } from './survey/survey.component';
import { EnergyComponent } from './energy.component';

import { AuthGuard } from '../../guard/auth-guard.service';

export const EnergyRoutes: Route[] = [
    {
        path: 'energy',
        component: EnergyComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'report', pathMatch: 'full' },
                    { path: 'report', component: ReportComponent },
                    { path: 'survey', component: SurveyComponent },

                ]
            }
        ]
    }
];
