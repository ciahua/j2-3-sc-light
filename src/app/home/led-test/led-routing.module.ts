import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guard/auth-guard.service';
import { LedTestComponent } from './led-test.component';


const routes: Routes = [

  {
    path: '',
    component: LedTestComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedRoutingModule { }
