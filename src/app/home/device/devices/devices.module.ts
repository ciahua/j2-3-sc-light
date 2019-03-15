import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { InstallLogComponent } from './install-log/install-log.component';
import { LineLogComponent } from './line-log/line-log.component';
import { DeviceHomeComponent } from './device-home/device-home.component';
import { HistoryDataComponent } from './device-detail/history-data/history-data.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { FileUploadModule } from 'ng2-file-upload';   // Should import HERE
@NgModule({
  imports: [
    CommonModule,
    DevicesRoutingModule,
    FormsModule,
    SharedModule,
    FileUploadModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    DevicesComponent,
    InstallLogComponent,
    LineLogComponent,
    DeviceHomeComponent,
    HistoryDataComponent,
    DeviceDetailComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DevicesModule { }
