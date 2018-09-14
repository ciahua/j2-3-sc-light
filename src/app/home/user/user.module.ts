import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { RightComponent } from './right/right.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminComponent, RightComponent]
})
export class UserModule { }
