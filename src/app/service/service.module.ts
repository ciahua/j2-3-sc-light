import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenService } from './full-screen.service';
import { DialogService } from './dialog.service';
import { BeiduAPIService } from './servers/baiduApi';
import { BeiduMAPService } from './servers/baiduMap';
import { MonitorService } from './monitor.service';
import { MessageService } from './message.service';
import { MessService } from './mess.service';
import { UrlService } from './url.service';
import { CommunicateService } from './communicate.service';
import { VideoService } from './video.service';
import { BaiduFunService } from './baidu-fun.service';
import { LightService } from './light.service';
import { CoverService } from './cover.service';
import { AirmonitorService } from './airmonitor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [FullScreenService, BeiduAPIService, BeiduMAPService, MonitorService,
    LightService, CoverService, AirmonitorService,
    MessService, MessageService, UrlService, CommunicateService, VideoService, BaiduFunService]
})
export class ServiceModule { }
