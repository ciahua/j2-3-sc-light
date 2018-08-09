import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { GridsterModule } from 'angular-gridster2';
import { VideoService } from '../../../service/video.service';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';

// baidu map
declare let BMap;
declare let Aliplayer;
declare let $: any;
declare let BMapLib;

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  @ViewChild('map2') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象
  city = '广州市'; // 当前选中城市
  controlShow = false; // 控制页

  addImg = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  zTreeObj: any;

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes: any;
  isActive: number; // 被选中的视频
  index: number; // 视频索引
  hasVideo = []; // 有视频的

  videoNum = 1; // 哪种宫格
  that = this;

  options: GridsterConfig;
  // dashboard: Array<GridsterItem>;
  dashboard: Array<any>;
  dashboardO: Array<any>;
  dashboardF: Array<any>;
  dashboardN: Array<any>;

  public zTreeOnClick: (event, treeId, treeNode) => void;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }



  constructor(private videoService: VideoService) {
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnClick = (event, treeId, treeNode) => {
      const index = this.isActive;
      this.city = treeNode.full_name;
      console.log(treeNode.tId + ', ' + treeNode.full_name);
      this.getPoint(that.map, that.city);

      if (this.isActive !== null && this.isActive !== undefined) {
        this.addImg[index] = 0;
        let id;
        id = this.dashboard[this.index].id;
        this.dashboard[this.index].hasAdd = true;
        console.log(this.dashboard);
        let player;
        setTimeout(() => {
          player = new Aliplayer({
            'id': id,
            'source': `rtmp://live-play.2inno.cn/apptest/streamtest${index + 1}?auth_key=1533712387-0-0-1b1a59f7bbf89050089d6a8cd47febd0`,
            'width': '100%',
            'height': '500px',
            'autoplay': true,
            'isLive': false,
            'rePlay': false,
            'playsinline': true,
            'preload': true,
            'controlBarVisibility': 'hover',
            'useH5Prism': true
          }, function (play) {
            console.log('播放器创建了。');
          }
          );
        }, 2);

      }
    };

  }



  ngOnInit() {


    this.addBeiduMap();

    // this.options = {
    //   itemChangeCallback: VideoComponent.itemChange,
    //   itemResizeCallback: VideoComponent.itemResize,
    // };

    this.dashboardO = [
      { cols: 2, rows: 1, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-0'},

    ];
    this.dashboardF = [
      { cols: 6, rows: 6, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-1' },
      { cols: 6, rows: 6, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-2' },
      { cols: 6, rows: 6, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-3' },

    ];

    this.dashboardN = [
      { cols: 6, rows: 6, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-4' },
      { cols: 4, rows: 4, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-5' },
      { cols: 4, rows: 4, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-6' },
      { cols: 4, rows: 4, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-7' },
      { cols: 4, rows: 4, y: 0, x: 0, isActive: false, hasAdd: false, id: 'dashboard-8' },


    ];
    this.dashboard = this.dashboardO;

    this.getZoneDefault();

  }

  getZoneDefault() {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      callback: {
        onClick: this.zTreeOnClick
      }
    };
    this.videoService.getZoneDefault()
      .subscribe({
        next: function (res) {
          that.model.ZoneDefault = res;
          that.zNodes = res.regions;
          that.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, that.zNodes);
        },
        complete: function () {
          console.log('that.zNodes!');
          console.log(that.zNodes);
        },
        error: function (error) {
          console.log(error);
        }
      });
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
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别

    const marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中

  }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const name = city;
    let pt;

    // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    myGeo.getPoint(name, function (point) {
      if (point) {

        baiduMap.centerAndZoom(point, 19);
        pt = point;
        const marker = new BMap.Marker(point);  // 创建标注
        baiduMap.addOverlay(marker);
      } else {
        console.log('您选择地址没有解析到结果!');
      }
    }, '');
  }

  // 切换宫格
  seleteNum(num) {
    if (this.videoNum === num) {
      return;
    }
    if (num === 1) {
      this.dashboard = this.dashboard.slice(0, 1);
    } else if (num === 4) {
      if (this.videoNum > num) {
        this.dashboard = this.dashboard.slice(0, 4);
      } else {
        this.dashboard = this.dashboard.concat(this.dashboardF);
      }

    } else if (num === 9) {
      if (this.videoNum === 1) {
        this.dashboard = this.dashboard.concat(this.dashboardF, this.dashboardN);
      } else if (this.videoNum === 4) {
        this.dashboard = this.dashboard.concat(this.dashboardN);
      }
    }

    this.videoNum = num;
    this.isActive = null;

    const dashboard = this.dashboard;

    console.log(dashboard);
    for (let ind = 0; ind < dashboard.length; ind++) {
      if (dashboard[ind].hasAdd === true) {
        console.log(dashboard[ind]);
        let id;
        let player;
        id = dashboard[ind].id;
        setTimeout(() => {
          player = new Aliplayer({
            'id': id,
            'source': `rtmp://live-play.2inno.cn/apptest/streamtest${ind + 1}?auth_key=1533712387-0-0-1b1a59f7bbf89050089d6a8cd47febd0`,
            'width': '100%',
            'height': '500px',
            'autoplay': true,
            'isLive': false,
            'rePlay': false,
            'playsinline': true,
            'preload': true,
            'controlBarVisibility': 'hover',
            'useH5Prism': true
          }, function (play) {
            console.log('播放器创建了。');
          }
          );
        }, 2);
      }

    }


  }

  // 点击添加
  addVideo(index, num) {

    this.index = index;
    if (index === this.isActive) {
      this.isActive = null;
    } else {
      this.isActive = index;

    }


    switch (num) {
      case 1:
        this.dashboardO[index].isActive = true;
        break;
      case 4:
        this.dashboardF[index].isActive = true;
        break;
      case 9:
        this.dashboardN[index].isActive = true;
        break;
      default:
        break;
    }
  }



  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

}
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: security.component.ts
@time: 2018 /8 / 9 9: 00

*/
