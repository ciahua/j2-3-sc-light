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

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [FullScreenService, BeiduAPIService, BeiduMAPService, MonitorService,
    MessService, MessageService, UrlService, CommunicateService]
})
export class ServiceModule { }
