import { BrowserModule } from '@angular/platform-browser';
import { GridsterModule } from 'angular-gridster2';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeviceModule } from './device/device.module';
import { ApplicationModule } from './application/application.module';

import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';

import { SurveyComponent } from './energy/survey/survey.component';
import { ReportComponent } from './energy/report/report.component';


import { VideoComponent } from './video/video.component';
import { ManageComponent } from './manage/manage.component';






@NgModule({
    imports: [BrowserModule, DeviceModule, UserModule, GridsterModule, ApplicationModule, RuleModule],
    declarations: [
    SurveyComponent, ReportComponent,  VideoComponent, ManageComponent,


    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})
export class HomeModule { }
