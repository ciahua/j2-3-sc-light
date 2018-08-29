import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqModalComponent } from './sq-modal/sq-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SqModalComponent],
  exports: [
    CommonModule,
    SqModalComponent
  ]
})
export class SharedModule { }
