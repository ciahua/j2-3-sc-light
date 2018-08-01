import { BrowserModule } from '@angular/platform-browser';
import { GridsterModule } from 'angular-gridster2';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { DeviceModule } from './device/device.module';


import { UserModule } from './user/user.module';


import { CoverComponent } from './application/cover/cover.component';
import { CalamityComponent } from './application/calamity/calamity.component';


import { SurveyComponent } from './energy/survey/survey.component';
import { ReportComponent } from './energy/report/report.component';

import { AlertComponent } from './alert/alert.component';

import { ControlComponent } from './control/control.component';
import { VideoComponent } from './video/video.component';
import { ManageComponent } from './manage/manage.component';






@NgModule({
    imports: [BrowserModule, DeviceModule, UserModule, GridsterModule],
    declarations: [  CoverComponent, CalamityComponent,
        SurveyComponent, ReportComponent, AlertComponent, ControlComponent, VideoComponent, ManageComponent

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})
export class HomeModule { }
