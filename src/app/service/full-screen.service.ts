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

}
