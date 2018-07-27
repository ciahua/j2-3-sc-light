import { NgModule } from '@angular/core';


import { DeviceModule } from './device/device.module';


import { UserModule } from './user/user.module';


import { CoverComponent } from './application/cover/cover.component';
import { CalamityComponent } from './application/calamity/calamity.component';


import { SurveyComponent } from './energy/survey/survey.component';
import { ReportComponent } from './energy/report/report.component';

import { AlertComponent } from './alert/alert.component';

import { ControlComponent } from './control/control.component';






@NgModule({
    imports: [DeviceModule, UserModule],
    declarations: [  CoverComponent, CalamityComponent,
         SurveyComponent, ReportComponent, AlertComponent, ControlComponent,

    ],


})
export class HomeModule { }
