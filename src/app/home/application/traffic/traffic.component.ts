import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorService } from '../../../service/monitor.service';
import { CameraService } from '../../../service/camera.service';

// baidu map
declare let Aliplayer;
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
  NorthEast: any;
  SouthWest: any;

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentChildren: any; // 当前城市节点
  currentBlock: any; // // 当前城市街道

  currentCamera: any;  // 当前摄像头


  visible = true; // 控制可视区域
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  zoom: any; // 地图级数

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点


  constructor(private monitorService: MonitorService, public router: Router,
    private cameraService: CameraService) { }

  ngOnInit() {
    this.addBeiduMap();
    this.getCity(); // 获取城市列表
  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 15); // 设置中心和地图显示级别
    map.setMapStyle({ style: 'googlelite' });

    // 添加控件缩放

    const offset = new BMap.Size(100, 20);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      offset: offset,
    });
    map.addControl(navigationControl);

    const ctrl = new BMapLib.TrafficControl({
      showPanel: true , // 是否显示路况提示面板
    });
    map.addControl(ctrl);
    ctrl.showTraffic({ predictDate: { hour: 15, weekday: 5 } });
    ctrl.setAnchor(BMAP_ANCHOR_TOP_RIGHT);
    ctrl.setOffset(new BMap.Size(180, 20));

    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用

    // const marker = new BMap.Marker(point);  // 创建标注
    // map.addOverlay(marker);               // 将标注添加到地图中
    this.addMarker();
    this.dragendOff(map);
    this.zoomendOff(map);
    this.mapClickOff(map); // 地图点击信息框隐藏
  }
  // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
  dragendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('dragend', function () {
      baiduMap.clearOverlays();
      that.addMarker(); // 获取数据-添加标注
    });
  }
  // 监控-地图缩放事件-地图缩放后的级别。
  zoomendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('zoomend', function () {
      // if (that.isqueryPoint === true) {
      //   that.isqueryPoint = false;
      // } else {
        baiduMap.clearOverlays();
        that.addMarker(); // 添加标注
        // console.log('地图缩放至：' + baiduMap.getZoom() + '级');
      // }
    });
  }
  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.currentCamera = null;
    });
  }
  // 添加标注
  addMarker() {
    this.getCameras();
  }
  // 获取指定坐标范围的摄像头
  getCameras() {
    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角

    let value;
    this.cameraService.getCameras(NorthEast, SouthWest).subscribe({
      next: function (val) {
        value = val;
      },
      complete: function () {
        that.addPoint(value);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 添加点标注
  addPoint(val) {
    const markers: any[] = [];
    const points: any[] = [];
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      // const name = item.name;
      // 添加自定义覆盖物
      let myIcon;

      if (item.error === true) { // 异常
        myIcon = new BMap.Icon('../../../../assets/imgs/camera_error.png', new BMap.Size(300, 157));
      } else if (item.offline === true) { // 掉线
        myIcon = new BMap.Icon('../../../../assets/imgs/camera_offline.png', new BMap.Size(300, 157));
      } else { // 正常
        myIcon = new BMap.Icon('../../../../assets/imgs/camera_normal.png', new BMap.Size(300, 157));
      }
      myIcon.setAnchor(new BMap.Size(16, 38));
      const marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
      this.map.addOverlay(marker2);
      markers.push(marker2); // 聚合
      points.push(point); // 聚合
    });

    // 点击点标注事件
    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
      that.openSideBar(marker, that.map, val[index], points[index]);
    }
  }

  // 地图点注标-点击事件
  openSideBar(marker, baiduMap, camera, point) {
    const that = this;
    const opts = {
      width: 350,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
      // border-radius: 5px,
    };
    let txt = `<p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc;'>设备编号 | ${camera.positionNumber} </p>`;

    txt = txt + `<p  class='cur-pointer'> 设备名称：${camera.description}</p>`;
    if (camera.offline === false) {
      txt = txt + `<p  class='cur-pointer'> 是否离线：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否离线：<span style='color: red'>是</span></p>`;
    }
    if (camera.error === false) {
      txt = txt + `<p  class='cur-pointer'> 是否异常：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否异常：<span style='color: red'>是</span></p>`;
    }
    txt = txt + `<button class='btn btn-bg' style='font-size: 14px; float: right; margin: 5px' id='${camera.id}'>详情</button>`;

    const infoWindow = new BMap.InfoWindow(txt, opts);

    marker.addEventListener('click', function () {
      that.currentCamera = camera;

      // that.cameraAddEventListener();
      // baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
      setTimeout(() => {
        that.cameraAddEventListener();
      }, 2);
    });

  }
  // 点击子设备
  cameraAddEventListener() {
    const that = this;
    let player;
    setTimeout(() => {
      player = new Aliplayer({
        'id': 'video_play',
        'source': that.currentCamera.videoUrl,
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

      // const device = $(`#${this.Camera.id}`);
      // device.on('click', function () {
      //   console.log('ddd');
      //   that.cameraChild = that.Camera;
      //   let player;
      //   setTimeout(() => {
      //     player = new Aliplayer({
      //       'id': 'video_play',
      //       'source': that.Camera.videoUrl,
      //       'width': '100%',
      //       'height': '500px',
      //       'autoplay': true,
      //       'isLive': false,
      //       'rePlay': false,
      //       'playsinline': true,
      //       'preload': true,
      //       'controlBarVisibility': 'hover',
      //       'useH5Prism': true
      //     }, function (play) {
      //       console.log('播放器创建了。');
      //     }
      //     );
      //   }, 2);
      // });

  }
  // 关闭按钮
  closeDetail() {
    this.currentCamera = null;
  }

  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    this.zoom = baiduMap.getZoom(); // 地图级别
  }
  // 获取城市列表 --ok
  getCity() {
    const that = this;

    this.monitorService.getZoneDefault().subscribe({
      next: function (val) {
        that.cityList = val.regions;
        that.currentCity = val.zone;
        that.zoom = that.switchZone(val.zone.level);
        that.node = that.getNode(val.regions, val.zone.region_id);
        that.currentChildren = that.node.children;

      },
      complete: function () {
        that.addBeiduMap(); // 创建地图

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 省市区街道-地图级别
  switchZone(level) {
    let zone = 12;
    switch (level) {
      case 1:
        zone = 10;
        break;
      case 2:
        zone = 12;
        break;
      case 3:
        zone = 15;
        break;
      case 4:
        zone = 19;
        break;
      default:
        break;
    }
    return zone;
  }

  getNode(json, nodeId) {
    const that = this;

    // 1.第一层 root 深度遍历整个JSON
    for (let i = 0; i < json.length; i++) {
      if (that.node) {
        break;
      }

      const obj = json[i];

      // 没有就下一个
      if (!obj || !obj.id) {
        continue;
      }
      // console.log(nodeId);
      // console.log(obj.id);
      // 2.有节点就开始找，一直递归下去
      if (obj.id === nodeId) {
        // 找到了与nodeId匹配的节点，结束递归
        that.node = obj;

        break;
      } else {

        // 3.如果有子节点就开始找
        if (obj.children) {
          // 4.递归前，记录当前节点，作为parent 父亲
          that.parentNode = obj;

          // 递归往下找
          that.getNode(obj.children, nodeId);
        } else {
          // 跳出当前递归，返回上层递归
          continue;
        }
      }
    }


    // 5.如果木有找到父节点，置为null，因为没有父亲
    if (!that.node) {
      that.parentNode = null;
    }

    // 6.返回结果obj
    // return {
    //   parentNode: that.parentNode,
    //   node: that.node
    // };
    return that.node;
  }



  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const zoom = this.zoom = this.switchZone(city.level);
    const fullName = city.full_name;
    console.log(city);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);

    // let pt;

    // // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    // myGeo.getPoint(fullName, function (point) {
    //   if (point) {
    //     baiduMap.centerAndZoom(point, zoom);
    //     pt = point;

    //   } else {
    //     console.log('您选择地址没有解析到结果!');
    //   }
    // }, '');
  }
  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.currentCity = city;
    this.node = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.currentChildren = city.children;
  }

  selecteblock(block) {
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
  }

  // 显示区域
  showArea() {
    this.areashow = true;
  }
  // 显示城市
  showCiyt() {
    this.cityshow = true;
  }
  // 离开城市
  citylistMouseleave() {
    this.cityshow = false;
  }
  // 选择区域
  arealistMouseover(area) {

    this.currentBlock = area.children;
  }

  // 离开区域
  arealistMouseleave() {
    this.areashow = false;
    this.currentBlock = null;
  }

  arealistMouseNone() {
    this.areashow = true;
    this.currentBlock = null;
  }

}

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: traffic.component.ts
@time: 2018 /8 / 9 9: 00

*/

