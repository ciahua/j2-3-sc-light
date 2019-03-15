import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../guard/auth-guard.service';
import { LightComponent } from './light.component';
import { LightHomeComponent } from './light-home/light-home.component';
import { ThestrategyComponent } from './thestrategy/thestrategy.component';


const routes: Routes = [

  {
        path: '',
        component: LightComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'light-home', pathMatch: 'full' },
              { path: 'light-home', component: LightHomeComponent },
              { path: 'thestrategy', component: ThestrategyComponent },

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
export class LightRoutingModule { }
