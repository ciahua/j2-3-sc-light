import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  MatSliderModule, MatSlideToggleModule} from '@angular/material';

import { LedTestComponent } from './led-test.component';




@NgModule({
    imports: [BrowserModule, FormsModule, NgbModule,
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
