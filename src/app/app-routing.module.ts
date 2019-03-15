import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './guard/can-deactivate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy'; // 预加载
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' }, // 懒加载
    { path: 'home', loadChildren: './home/home.module#HomeModule', data: { preload: true }}, // 懒加载 + 预加载
    { path: '**', component: PageNotFoundComponent }

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                preloadingStrategy: SelectivePreloadingStrategy // 预加载

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
