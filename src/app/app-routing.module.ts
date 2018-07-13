import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

import { CanDeactivateGuard } from './guard/can-deactivate-guard.service';
import { AuthGuard } from './guard/auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { LoginComponent } from './login/login.component';
import { HomeRoutes } from './home/home.routes';

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    ...HomeRoutes,
    { path: '**', component: PageNotFoundComponent },
    // { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // enableTracing: true, // <-- debugging purposes only
                preloadingStrategy: SelectivePreloadingStrategy,

            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard,
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule { }


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: app-routing.module.ts
@time: 2018 / 7 / 2 17: 18

*/
