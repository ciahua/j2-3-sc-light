import { NgModule } from '@angular/core';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DevicerRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { ProductComponent } from './product/product.component';
import { DevicesComponent } from './devices/devices.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        DevicerRoutingModule
    ],
    declarations: [
        DeviceComponent,
        PositionComponent,
        ProductComponent,
        DevicesComponent

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DeviceModule { }
