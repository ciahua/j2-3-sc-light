import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { AirreportComponent } from './airreport.component';


const routes: Routes = [

  {
    path: '',
    component: AirreportComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirreportRoutingModule { }
