
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  MatSliderModule, MatSlideToggleModule} from '@angular/material';

import { LedTestComponent } from './led-test.component';
import { LedRoutingModule } from './led-routing.module';




@NgModule({
    imports: [ CommonModule, FormsModule,  LedRoutingModule,
         MatSliderModule, MatSlideToggleModule,
    ],
    declarations: [
        LedTestComponent,

],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class LedModule { }
