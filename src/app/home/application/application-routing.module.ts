import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';
import { ApplicationComponent } from './application.component';
// import { LightComponent } from './light/light.component';
// import { SecurityComponent } from './security/security.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WaterComponent } from './water/water.component';
// import { AirComponent } from './air/air.component';
import { ElectricalComponent } from './electrical/electrical.component';
import { LedComponent } from './led/led.component';


const routes: Routes = [

  {
    path: '',
    component: ApplicationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'cover', pathMatch: 'full' },
          { path: 'air', loadChildren: './air/air.module#AirModule' },
          { path: 'light', loadChildren: './light/light.module#LightModule' },
          { path: 'issuedata', loadChildren: './issuedata/issuedata.module#IssuedataModule' },
          { path: 'cover', component: CoverComponent },
          { path: 'calamity', component: CalamityComponent },
          // { path: 'security', component: SecurityComponent },
          { path: 'traffic', component: TrafficComponent },
          { path: 'water', component: WaterComponent },
          { path: 'electrical', component: ElectricalComponent },
          { path: 'led', component: LedComponent }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
