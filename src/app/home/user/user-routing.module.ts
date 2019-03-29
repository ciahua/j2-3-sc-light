import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { RightComponent } from './right/right.component';
import { UserComponent } from './user.component';
import { CustomerComponent } from './customer/customer.component';
import { AdministrationComponent } from './administration/administration.component';

const routes: Routes = [

  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'admin', pathMatch: 'full' },
          { path: 'admin', component: AdminComponent },
          { path: 'right', component: RightComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'administration', component: AdministrationComponent}

        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
