import { Component, Injectable, EventEmitter } from '@angular/core';

import { WindowRef } from '../windowserver';

@Injectable()
export class UrlService {
    public token: string;
    public userId: string;
    constructor(private winRef: WindowRef) {
    }

    // 设置url中参数值
    setURLParam(param, value) {
        const query = location.search.substring(1);
        const p = new RegExp('(^|)' + param + '=([^&]*)(|$)');
        if (p.test(query)) {
            const firstParam = query.split(param)[0];
            const secondParam = query.split(param)[1];
            if (secondParam.indexOf('&') > -1) {
                const lastPraam = secondParam.substring(secondParam.indexOf('&') + 1);
                return '?' + firstParam + param + '=' + value + '&' + lastPraam;
            } else {
                if (firstParam) {
                    return '?' + firstParam + param + '=' + value;
                } else {
                    return '?' + param + '=' + value;
                }
            }
        } else {
            if (query === '') {
                return '?' + param + '=' + value;
            } else {
                return '?' + query + '&' + param + '=' + value;
            }
        }
    }

    // 在当前浏览器url添加参数
    addURLParam(key, value) {
        let url = window.location.href; // 获取当前url
        // let href;
        if (url.indexOf('?') > 0) {
            url = url.split('?')[0];
        }
        window.location.href = url + this.setURLParam(key, value);
        // href = url + this.setURLParam(key, value);
        // return href;
    }

    // 打开新的窗口并url添加参数
    addURLParamAddOpen(key, value) {
        let url = window.location.href; // 获取当前url
        let href;
        if (url.indexOf('?') > 0) {
            url = url.split('?')[0];
        }
        // window.location.href = url + this.setParam(key, value);
        href = url + this.setURLParam(key, value);
        // return href;
        window.open(href, '_blank');
    }

    // 获取参数

    getURLParam(paraName) {
        const url = document.location.toString();
        const arrObj = url.split('?');
        if (arrObj.length > 1) {
            const arrPara = arrObj[1].split('&');
            let arr;
            for (let i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split('=');
                if (arr != null && arr[0] === paraName) {
                    return arr[1];
                }
            }
            return '';
        } else {
            return '';
        }
    }
}
