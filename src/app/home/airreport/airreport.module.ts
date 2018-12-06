import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AirreportComponent } from './airreport.component';
import { AirreportRoutingModule } from './airreport-routing.module';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule, ReactiveFormsModule, AirreportRoutingModule,

    ],
    declarations: [AirreportComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AirreportModule { }
