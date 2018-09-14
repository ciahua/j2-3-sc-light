import { NgModule } from '@angular/core';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';

import { PositionComponent } from './position/position.component';
import { ProductComponent } from './product/product.component';

import { FormsModule } from '@angular/forms';

import { DevicesComponent } from './devices/devices.component';




@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        NgbModule,
        SharedModule
    ],
    declarations: [
        PositionComponent,

        ProductComponent,
        DevicesComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DeviceModule { }
