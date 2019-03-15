import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { DeviceMonitorComponent } from './device-monitor.component';


const routes: Routes = [

  {
    path: '',
    component: DeviceMonitorComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceMonitorRoutingModule { }
