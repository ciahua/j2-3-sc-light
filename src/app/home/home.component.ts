import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AUTHORITYTREECOPYROUTE } from '../data/Authority.tree.route';
import { MessService } from '../service/mess.service';
import { CommunicateService } from '../service/communicate.service';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  customerId: any;
  authoritiesList: any; // 当前用户权限列表


  constructor(public authService: AuthService, public router: Router,
    // state: RouterStateSnapshot,
    private _cookieService: CookieService,
    public messService: MessService,
    public config: NgbDropdownConfig,
    private communicateService: CommunicateService,
    public jwtHelper: JwtHelperService,
     ) {
    this.routeTree = AUTHORITYTREECOPYROUTE;
    config.placement = 'top-left';
    const token = localStorage.getItem('token');
    this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
    // this.visible = urlService.getURLParam('visible') === '' ? true : false;
    // 全屏
    this.communicateService.getMessage().subscribe((message: any) => {
      this.visible = message.mess;
    });
    // console.log(this.customerId);

    // const url: string = state.url;
    // console.log(router);
  }

  ngOnInit() {
    this.currentUser = this._cookieService.getObject('currentUser');
    const currentUser = JSON.parse(this.currentUser);
    this.loginName = currentUser.loginName;
  }

  // 路由跳转-传递参数-这是在html中绑定的click跳转事件
  jumpHandle(item) {
    this.queryPoint = item;
    this.messService.StatusMission(this.queryPoint);
    // this.communicateService.sendMessage(this.queryPoint);
    this.router.navigate([`home/monitor`]);

  }

  // 判断数组中是否存在值
  getture( str) {
      const Authorities = JSON.parse(localStorage.getItem('Authorities'));
      const Auth = Authorities ? Authorities.Authorities : [];
      let res = false;
      if (str === 'HP-000') {
        res = true;
        return res;
      }
      if (this.customerId && str === 'DM-007') {
        res = false;
        return res;
      }
      Auth.map(item => {
        if (item === str) {
          res = true;
          return res;
        }
      });
      return res;
  }


  // 退出登录
  logout() {

    this.authService.logout();
  }

  // 侧边栏开合按钮
  switchSidebar() {
    this.open = !this.open;
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
