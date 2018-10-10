import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';



import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';

import { GridsterModule } from 'angular-gridster2';




import { HomeModule } from './home/home.module';
import { ServiceModule } from './service/service.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { DeviceComponent } from './home/device/device.component';
import { UserComponent } from './home/user/user.component';
import { MonitorComponent } from './home/monitor/monitor.component';
import { ApplicationComponent } from './home/application/application.component';



import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';


import { AuthGuard } from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';
import { WindowRef } from './windowserver';


import { PageNotFoundComponent } from './not-found.component';
// import { InterceptorService } from './interceptorService';
import { HttpClientModule } from '@angular/common/http'; // HTTP_INTERCEPTORS,
import { JwtModule } from '@auth0/angular-jwt';
import { httpInterceptorProviders } from './index';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    DeviceComponent,
    UserComponent,
    MonitorComponent,
    ApplicationComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    GridsterModule,
    MaterialModule,

    ServiceModule,
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })

  ],
  exports: [],
  providers: [
    AuthGuard, AuthService, WindowRef, httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
 // Diagnostic only: inspect router configuration
  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
 }
