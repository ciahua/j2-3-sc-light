import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_BOTTOM_RIGHT;
declare let BMAP_ANCHOR_TOP_RIGHT;
declare let BMAP_ANCHOR_TOP_LEFT;


@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {

  @ViewChild('map4') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象
  constructor() { }

  ngOnInit() {
    this.addBeiduMap();
  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 15); // 设置中心和地图显示级别
    map.setMapStyle({ style: 'googlelite' });

    // 添加控件缩放

    const offset = new BMap.Size(20, 15);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);

    const ctrl = new BMapLib.TrafficControl({
      showPanel: true , // 是否显示路况提示面板
    });
    map.addControl(ctrl);
    ctrl.showTraffic({ predictDate: { hour: 15, weekday: 5 } });
    ctrl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
    ctrl.setOffset(new BMap.Size(85, 27));

    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用

    const marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中

  }

}

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: traffic.component.ts
@time: 2018 /8 / 9 9: 00

*/

