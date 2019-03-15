import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../guard/auth-guard.service';
import { IssuedataComponent } from './issuedata.component';


const routes: Routes = [

  {
    path: '',
    component: IssuedataComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuedataRoutingModule { }
