import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';
import { HttpClientModule } from '@angular/common/http'; // HTTP_INTERCEPTORS,
import { FileUploadModule } from 'ng2-file-upload';
import { JwtModule } from '@auth0/angular-jwt';
import { httpInterceptorProviders } from './interceptor/index';
import { ServiceModule } from './service/service.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';
import { PageNotFoundComponent } from './not-found.component';
import { PipesModule } from './pipes/pipes.module';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    ServiceModule,
    HttpClientModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    PipesModule

  ],
  exports: [],
  providers: [
    AuthGuard, AuthService,
     httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: app.module.ts
@time: 2018 / 7 / 2 17: 18

*/
