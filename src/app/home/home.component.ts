import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ROUTETREE } from '../data/route-tree';
import { MessageService } from '../service/message.serice';
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


  constructor(public authService: AuthService, public router: Router, private _cookieService: CookieService,
     private messageService: MessageService,
    config: NgbDropdownConfig) {
    this.routeTree = ROUTETREE;
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-right';
    // config.autoClose = false;
  }

  ngOnInit() {
    this.currentUser = this._cookieService.getObject('currentUser');
    this.loginName = this.currentUser.loginName;
    this.getMessage();

  }

  // 跳到控制台地图的具体的点
  goTothePoint(item) {
    console.log(item);
  }

  // 退出登录
  logout() {
    // console.log('ddd');
    this.authService.logout();

    // console.log(currentUser);
  }

  // 侧边栏开合按钮
  switchSidebar() {
    this.open = !this.open;
    console.log(this.open);
  }

  // 获取消息列表
  getMessage() {
    const that = this;

    this.messageService.getMessage().subscribe({
      next: function (val) {
        console.log(val);
        that.messageList = val.list;

      },
      complete: function () {
        setTimeout(() => {
          that.marquee();
        }, 10);

      },
      error: function (error) {
        console.log(error);
      }
    });
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
