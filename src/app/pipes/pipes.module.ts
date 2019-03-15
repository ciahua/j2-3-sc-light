import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsOutputPipe } from './is-output.pipe';
import { MyFilterPipe } from './my-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IsOutputPipe,
    MyFilterPipe
  ],
  exports: [
    IsOutputPipe,
    MyFilterPipe
  ]

})
export class PipesModule { }
