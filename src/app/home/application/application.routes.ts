import { Route } from '@angular/router';
import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';
import { ApplicationComponent } from './application.component';
// import { EnvironmentComponent } from './environment/environment.component';
import { LightComponent } from './light/light.component';
import { SecurityComponent } from './security/security.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WaterComponent } from './water/water.component';
import { AirComponent } from './air/air.component';
import { ElectricalComponent } from './electrical/electrical.component';

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
                    // { path: 'environment', component: EnvironmentComponent },
                    { path: 'light', component: LightComponent },
                    { path: 'security', component: SecurityComponent },
                    { path: 'traffic', component: TrafficComponent },
                    { path: 'water', component: WaterComponent },
                    { path: 'air', component: AirComponent },
                    { path: 'electrical', component: ElectricalComponent }

                ]
            }
        ]
    }
];
