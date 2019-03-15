import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightRoutingModule } from './light-routing.module';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';

import { LightComponent } from './light.component';
import { LightHomeComponent } from './light-home/light-home.component';
import { ThestrategyComponent } from './thestrategy/thestrategy.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatStepperModule, MatInputModule, MatCardModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';





@NgModule({
  imports: [
    CommonModule,
    LightRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatStepperModule, MatButtonModule, MatInputModule, MatCardModule,
    MatSliderModule, MatSlideToggleModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  declarations: [
    LightComponent,
    LightHomeComponent,
    ThestrategyComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class LightModule { }
