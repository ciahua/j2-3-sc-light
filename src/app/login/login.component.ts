import { Component } from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  model:  any = {};
  error: any;
  loading = false;
  constructor(public authService: AuthService, public router: Router) {

  }


  onKeydown(event: any) {
    if (event.keyCode !== 13) {
      this.error = '';
    }
  }

  login() {
    this.loading = true;


    this.authService.login(this.model.username, this.model.password).subscribe(() => {

      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        // this.router.navigate([redirect], navigationExtras);
        this.router.navigate([redirect]);
      } else {
        this.error = '登录失败!';
        this.loading = false;
      }
    });
  }


  logout() {
    this.authService.logout();
  }
}


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: login.component.ts
@time: 2018 / 7 / 2 17: 18

*/
