import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../guard/auth-guard.service';
import { DevicesComponent } from './devices.component';
import { InstallLogComponent } from './install-log/install-log.component';
import { LineLogComponent } from './line-log/line-log.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceHomeComponent } from './device-home/device-home.component';
import { HistoryDataComponent } from './device-detail/history-data/history-data.component';

const routes: Routes = [

  {
        path: '',
        component: DevicesComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'devices-home', pathMatch: 'full' },
              { path: 'devices-home', component: DeviceHomeComponent },
              { path: 'install-log', component: InstallLogComponent },
              { path: 'line-log', component: LineLogComponent },
              { path: 'devices-detail', component: DeviceDetailComponent },
              { path: 'history-data', component: HistoryDataComponent }
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
export class DevicesRoutingModule { }
