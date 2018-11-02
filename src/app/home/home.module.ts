import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';


import { DeviceModule } from './device/device.module';
import { ApplicationModule } from './application/application.module';

import { UserModule } from './user/user.module';

import { SharedModule } from '../shared/shared.module';
import { StrategyModule } from './strategy/strategy.module';
import { AirreportModule } from './airreport/airreport.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { IssuedataModule } from './issuedata/issuedata.module';
import { LedModule } from './led-test/led.module';

import { HomepageComponent } from './homepage/homepage.component';
// import { AirreportComponent } from './airreport/airreport.component';


// import { IssuedataComponent } from './issuedata/issuedata.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// import { MapComponent } from './map/map.component';
// import { LedTestComponent } from './led-test/led-test.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot(),
         DeviceModule, UserModule, ApplicationModule, SharedModule,
        StrategyModule, AirreportModule, DashboardModule, IssuedataModule,
        LedModule

    ],
    declarations: [
    HomepageComponent,
    // LedTestComponent,
    //   IssuedataComponent,
    //  DashboardComponent,
        // MapComponent, LedTestComponent,


    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})
export class HomeModule { }
