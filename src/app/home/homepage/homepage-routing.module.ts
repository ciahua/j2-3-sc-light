import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { HomepageComponent } from './homepage.component';


const routes: Routes = [

  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
