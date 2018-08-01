import { Component, Injectable  } from '@angular/core';

import { WindowRef } from '../windowserver';

@Injectable()
export class FullScreenService {
    public token: string;
    public userId: string;
    constructor(private winRef: WindowRef) {
    }
    // 进入全屏
    enterFullScreen() {
        let de: any;

        de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
            console.log('1');
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
            console.log('2');
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
            console.log('3');
        }

    }
    // 退出全屏
    exitFullScreen() {
        let de: any;
        de = document.documentElement;
        if (de.exitFullscreen) {
            de.exitFullscreen();
            console.log('12');
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
            console.log('13');
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
            console.log('14');
        }
        console.log('15');

    }
            // 全屏
    fullScreen() {
        let el: any;
        el = document.documentElement;
        const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs !== 'undefined' && rfs) {
            rfs.call(el);
        }
        return;
    }
    // 退出全屏
    // exitScreen() {
    //     let el: any;

    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen();
    //     } else if (document.webkitCancelFullScreen) {
    //         document.webkitCancelFullScreen();
    //     } else if (document.msExitFullscreen) {
    //         document.msExitFullscreen();
    //     }
    //     if (typeof cfs != 'undefined' && cfs) {
    //         cfs.call(el);
    //     }
    // }
// ie低版本的全屏，退出全屏都这个方法
//  iefull() {
//     const el = document.documentElement;
//     const rfs = el.msRequestFullScreen;
//     if (typeof window.ActiveXObject !== 'undefined') {
//         // 这的方法 模拟f11键，使浏览器全屏
//         const wscript = new ActiveXObject('WScript.Shell');
//         if (wscript !== null) {
//             wscript.SendKeys('{F11}');
//         }
//     }
// }

}
