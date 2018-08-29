import { Component, Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
// import { Observable } from 'rxjs/';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

import { WindowRef } from '../windowserver';
declare let BMap;

@Injectable()
export class BaiduFunService {

    constructor(private http: Http,
        private winRef: WindowRef, private _cookieService: CookieService) {

    }

    // 创建图标标注
    makeIcon(type: string) {
        let myIcon;
        switch (type) {
            case 'light':
                myIcon = new BMap.Icon('../../../assets/imgs/dzx.png', new BMap.Size(48, 48));
                break;
            case 'cover':
                myIcon = new BMap.Icon('../../../assets/imgs/dzx1.png', new BMap.Size(48, 48));
                break;
            case 'camera':
                myIcon = new BMap.Icon('../../../assets/imgs/dzx2.png', new BMap.Size(48, 48));
                break;
            case 'gateway':
                myIcon = new BMap.Icon('../../../assets/imgs/dzx3.png', new BMap.Size(48, 48));
                break;
            default:
                break;
        }
        return myIcon;
    }


}
