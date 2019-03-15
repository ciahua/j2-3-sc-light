import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guard/auth-guard.service';
import { AirComponent } from './air.component';
import { AirHomeComponent } from './air-home/air-home.component';
import { TheairreportComponent } from './theairreport/theairreport.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

    {
      path: '',
        component: AirComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'air-home', pathMatch: 'full' },
              { path: 'air-home', component: AirHomeComponent },
              { path: 'theairreport', component: TheairreportComponent },
              { path: 'dashboard', component: DashboardComponent }
            ]
          }
        ]
    }

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
    declarations: []
  })
  export class AirRoutingModule { }
