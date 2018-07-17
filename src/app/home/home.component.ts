import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ROUTETREE } from '../data/route-tree';

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


  constructor(public authService: AuthService, public router: Router, private _cookieService: CookieService,
    config: NgbDropdownConfig) {
    this.routeTree = ROUTETREE;
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-right';
    // config.autoClose = false;
  }

  ngOnInit() {
    this.currentUser = this._cookieService.getObject('currentUser');
    this.loginName = this.currentUser.loginName;
    console.log(this.currentUser);
    console.log(this.loginName);
  }

  logout() {
    // console.log('ddd');
    this.authService.logout();

    // console.log(currentUser);
  }
  switchSidebar() {
    this.open = !this.open;
    console.log(this.open);
  }

}

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.component.ts
@time: 2018 / 7 / 2 17: 18

*/
