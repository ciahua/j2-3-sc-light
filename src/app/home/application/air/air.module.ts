import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AirRoutingModule } from './air-routing.module';
import { AirComponent } from './air.component';
import { AirHomeComponent } from './air-home/air-home.component';
import { TheairreportComponent } from './theairreport/theairreport.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [CommonModule,
              AirRoutingModule,
              FormsModule,
              SharedModule,
              NgbModule.forRoot(),
    ],
    declarations: [
        AirComponent,
        AirHomeComponent,
        TheairreportComponent,
        DashboardComponent
],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AirModule {}
