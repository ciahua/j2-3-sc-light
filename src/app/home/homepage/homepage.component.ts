import { Component, ElementRef, OnInit } from '@angular/core';
// import { ROUTELIST } from './route-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  // routes = ROUTELIST;
  constructor(public router: Router,  private elementRef: ElementRef) { }

  flag = true;


  // setChange() {
  //   const styApp = this.elementRef.nativeElement.querySelector('.app');
  //   const sty = this.elementRef.nativeElement.querySelector('.btn1');
  //   if (styApp) {
  //     sty.style.background = 'url(../../../assets/imgs/user-profile.png) no-repeat center';
  //     this.elementRef.nativeElement.querySelector('.pp').remove();
  //   } else {
  //     sty.style.background = '#45939D';
  //     const d1 = this.elementRef.nativeElement.querySelector('.btn1');
  //     d1.insertAdjacentHTML('beforeend', '<div class="col-md-12 content pp"><p><span><i class="fa  nav-icon">
  //         </i></span></p><p class="app">APP下载</p></div>');
  //   }
  //  }

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
    const Authorities = JSON.parse(localStorage.getItem('Authorities'));
    const Auth = Authorities ? Authorities.Authorities : [];
    let res = false;
    if (str === 'HP-000') {
      res = true;
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
