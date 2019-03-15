import { NgModule } from '@angular/core';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DevicerRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { AdministrationComponent } from './administration/administration.component';
import { RoadComponent } from './road/road.component';
import { InstallComponent } from './install/install.component';
import { CustomerComponent } from './customer/customer.component';





@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        DevicerRoutingModule,
        NgbModule.forRoot(),
        FileUploadModule
    ],
    declarations: [
        DeviceComponent,
        PositionComponent,
        AdministrationComponent,
        RoadComponent,
        InstallComponent,
        CustomerComponent,


    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DeviceModule { }
