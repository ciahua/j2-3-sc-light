import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ROUTETREE } from '../data/route-tree';
import { MessService } from '../service/mess.service';
// import { UrlService } from '../service/url.service';s
import { CommunicateService } from '../service/communicate.service';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  loginName: string;
  isCollapsed = false;
  routeTree: any;
  open = false;
  messageList: any; // 消息列表
  queryPoint: any;
  visible = true; // 控制可视区域


  constructor(public authService: AuthService, public router: Router, private _cookieService: CookieService,
    public messService: MessService,
    private config: NgbDropdownConfig, private communicateService: CommunicateService) {
    this.routeTree = ROUTETREE;
    // customize default values of dropdowns used by this component tree
    config.placement = 'top-left';


    // this.visible = urlService.getURLParam('visible') === '' ? true : false;

 // 全屏
    this.communicateService.getMessage().subscribe((message: any) => {
      // console.log(message); // send a message

      this.visible = message.mess;

    });
  }

  ngOnInit() {
    this.currentUser = this._cookieService.getObject('currentUser');
    this.loginName = this.currentUser.loginName;


  }

  // 路由跳转-传递参数-这是在html中绑定的click跳转事件
  jumpHandle(item) {
    this.queryPoint = item;
    this.messService.StatusMission(this.queryPoint);
    // this.communicateService.sendMessage(this.queryPoint);
    this.router.navigate([`home/monitor`]);

  }



  // 退出登录
  logout() {

    this.authService.logout();
  }

  // 侧边栏开合按钮
  switchSidebar() {
    this.open = !this.open;
    console.log(this.open);
  }


  // 字幕动画
  marquee() {

    $('.marquee').marquee({
      // duration in milliseconds of the marquee
      duration: 3000,
      // speed: 5000,
      // gap in pixels between the tickers
      gap: 0,
      // time in milliseconds before the marquee will start animating
      delayBeforeStart: 0,
      // 'left' or 'right'
      direction: 'up', // 方向
      // true or false - should the marquee be duplicated to show an effect of continues flow
      duplicated: true, // 重复
      pauseOnHover: true
    });
  }

}

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.component.ts
@time: 2018 / 7 / 2 17: 18

*/
