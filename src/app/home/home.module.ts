import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { GridsterModule } from 'angular-gridster2';
import { MatButtonModule, MatStepperModule, MatInputModule, MatCardModule , MatSliderModule, MatSlideToggleModule} from '@angular/material';

import { DeviceModule } from './device/device.module';
import { ApplicationModule } from './application/application.module';

import { UserModule } from './user/user.module';

import { SharedModule } from '../shared/shared.module';


import { DashbordComponent } from './dashbord/dashbord.component';
import { MapComponent } from './map/map.component';
import { StrategyComponent } from './strategy/strategy.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AirreportComponent } from './airreport/airreport.component';
import { EchartComponent } from './echart/echart.component';
import { EchartMapComponent } from './echart-map/echart-map.component';
import { LedTestComponent } from './led-test/led-test.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot(),
         DeviceModule, UserModule, GridsterModule, ApplicationModule, SharedModule,
        MatStepperModule, MatButtonModule, MatInputModule, MatCardModule,
        MatSliderModule, MatSlideToggleModule

    ],
    declarations: [
     DashbordComponent,
     MapComponent, StrategyComponent, HomepageComponent, AirreportComponent, EchartComponent, EchartMapComponent, LedTestComponent,


    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})
export class HomeModule { }
