import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../guard/auth-guard.service';
import { LedComponent } from './led.component';


const routes: Routes = [

  {
    path: '',
    component: LedComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedRoutingModule { }
