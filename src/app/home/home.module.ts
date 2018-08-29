import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { GridsterModule } from 'angular-gridster2';



import { DeviceModule } from './device/device.module';
import { ApplicationModule } from './application/application.module';

import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { SharedModule } from '../shared/shared.module';

import { SurveyComponent } from './energy/survey/survey.component';
import { ReportComponent } from './energy/report/report.component';

import { VideoComponent } from './video/video.component';
import { ManageComponent } from './manage/manage.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MapComponent } from './map/map.component';
import { StrategyComponent } from './strategy/strategy.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AirreportComponent } from './airreport/airreport.component';






@NgModule({
    imports: [BrowserModule, FormsModule, NgbModule.forRoot(),
         DeviceModule, UserModule, GridsterModule, ApplicationModule, RuleModule, SharedModule,

    ],
    declarations: [
    SurveyComponent, ReportComponent,  VideoComponent, ManageComponent, DashbordComponent,
     MapComponent, StrategyComponent, HomepageComponent, AirreportComponent,


    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})
export class HomeModule { }
