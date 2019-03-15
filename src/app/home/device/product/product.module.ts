import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { FunctionDefinitionComponent } from './function-definition/function-definition.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule,
    PipesModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ProductComponent,
    ProductHomeComponent,
    FunctionDefinitionComponent,



  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ProductModule { }
