import { Component, ElementRef, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  customerId: any;
  constructor(public router: Router,  private elementRef: ElementRef,
      public jwtHelper: JwtHelperService,

    ) {
    const token = localStorage.getItem('token');
    this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
  }

  flag = true;


  ngOnInit() {
  }

  goToZheRoute(para) {
    this.router.navigate([para]);
  }

  goToChange() {
    // this.setChange();

    if (this.flag === true) {
      this.flag = false;
    } else {
      this.flag = true;
    }

  }

  // 判断数组中是否存在值
  getture(str) {
    let res = false;
    const Authorities = JSON.parse(localStorage.getItem('Authorities'));
    const Auth = Authorities ? Authorities.Authorities : [];
    res = false;
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
}
