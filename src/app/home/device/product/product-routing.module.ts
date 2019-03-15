import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../guard/auth-guard.service';
import { ProductComponent } from './product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { FunctionDefinitionComponent } from './function-definition/function-definition.component';
// import { DataDefinitionComponent } from './function-definition/data-definition/data-definition.component';
// import { ServiceDescriptionComponent } from './function-definition/service-description/service-description.component';

const routes: Routes = [

  {
        path: '',
      component: ProductComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'product-home', pathMatch: 'full' },
              { path: 'product-home', component: ProductHomeComponent },
              { path: 'function-definition', component: FunctionDefinitionComponent },
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
export class ProductRoutingModule { }
