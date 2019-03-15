import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenService } from './full-screen.service';
import { DialogService } from './dialog.service';

import { MonitorService } from './monitor.service';

import { MessService } from './mess.service';
import { UrlService } from './url.service';
import { CommunicateService } from './communicate.service';
import { VideoService } from './video.service';

import { LightService } from './light.service';
import { CoverService } from './cover.service';
import { CameraService } from './camera.service';
import { AirmonitorService } from './airmonitor.service';
import { StrategyService } from './strategy.service';
import { DeviceService } from './device.service';
import { PositionService } from './position.service';
import { ProductService } from './product.service';
import { LedService } from './led.service';
import { AdminService } from './admin.service';
import { RightService } from './right.service';
import { IssuedataService } from './issuedata.service';
import { DeviceHistoryService } from './device-history.service';
import { RoadService } from './road.service';
import { CustomerService } from './customer.service';
import { FunctionDefinitionService } from './function-definition';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [FullScreenService,  MonitorService,
    LightService, CoverService, AirmonitorService, CameraService, StrategyService,
    DeviceService, PositionService, ProductService, LedService, DialogService, AdminService, RightService,
    MessService, UrlService, CommunicateService, VideoService, IssuedataService,
    DeviceHistoryService,
    RoadService,
    CustomerService,
    FunctionDefinitionService
   ]
})
export class ServiceModule { }
