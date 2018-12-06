import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guard/auth-guard.service';
import { StrategyComponent } from './strategy.component';


const routes: Routes = [

  {
    path: '',
    component: StrategyComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule { }
