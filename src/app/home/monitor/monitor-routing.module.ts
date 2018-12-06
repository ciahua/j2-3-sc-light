import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { AuthGuard } from '../../guard/auth-guard.service';

const routes: Routes = [

  {
        path: '',
        component: MonitorComponent,
        canActivate: [AuthGuard],

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
