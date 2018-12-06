import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { DevicesComponent } from './devices/devices.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [

  {
        path: '',
        component: DeviceComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'position', pathMatch: 'full' },
              { path: 'position', component: PositionComponent },
              { path: 'devices', component: DevicesComponent },
              { path: 'product', component: ProductComponent }


            ]
          }
        ]

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicerRoutingModule { }
