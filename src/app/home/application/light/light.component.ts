/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: light.component.ts
@time: 2018 /8 / 9 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Point } from '../../../data/point.type';
import { LIGHTLIST } from '../../../data/light-list';
import { MonitorService } from '../../../service/monitor.service';
import { LightService } from '../../../service/light.service';

// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit, OnDestroy  {

  @ViewChild('map5') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentChildren: any; // 当前城市节点
  currentBlock: any; // // 当前城市街道
  device: any; // // 当前设备点

  deviceChild: any; // // 当前设备点上-被点击的子设备
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  deviceshow = false; // 默认设备列表不显示

  visible = true; // 控制可视区域

  zoom: any; // 地图级数
  SouthWest: Point; // 地图视图西南角
  NorthEast: Point; // 地图视图东北角
  type = 0; // 设备类型

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  light_list = LIGHTLIST.val.light_list; // 数据模拟

  timer: any; // 定时器



  constructor(private monitorService: MonitorService, private lightService: LightService, public router: Router, ) { }

  ngOnInit() {
    this.addBeiduMap();
    this.getCity(); // 获取城市列表
    // this.getDevice(); // 获取设备列表
  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      // minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）

    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别

    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放



    map.setMapStyle({ style: 'dark' });
    // map.setMapStyle({ style: 'midnight' });
    // map.setMapStyle({ style: 'grayscale' });


    // 添加控件缩放

    const offset = new BMap.Size(20, 55);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);

    this.getLights(); // 获取地图上的点
    this.timer = setInterval(() => {
      this.remove_overlay(this.map);
      this.getLights(); // 获取地图上的点
    }, 5000);






    this.mapClickOff(map); // 地图点击信息框隐藏

  }

  // 清除覆盖物
  remove_overlay(baiduMap) {
    baiduMap.clearOverlays();
  }

  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    this.zoom = baiduMap.getZoom(); // 地图级别

  }

  getLights() {
    const that = this;
    const type = this.type;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    let value;
    this.lightService.getLights(NorthEast, SouthWest).subscribe({
      next: function (val) {
        value = val;
      },
      complete: function () {
        that.addMarker(value);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.deviceChild = null;
    });
  }

  // 地图上描点
  addMarker(light_list) {
    const markers: any[] = [];
    const points: any[] = [];
    for (let index = 0; index < light_list.length; index++) {
      const item = light_list[index];
      const point = new BMap.Point(item.point.lng, item.point.lat);

      let myIcon;
      if (item.offline === true || item.error === true)  { // 异常
        myIcon = new BMap.Icon('../../../../assets/imgs/light-breakdown.png', new BMap.Size(36, 36));

      } else if (item.level === 0) { // 正常,没亮
        myIcon = new BMap.Icon('../../../../assets/imgs/light-normal.png', new BMap.Size(36, 36));

      } else if (item.level < 30) { // 一级亮度
       myIcon = new BMap.Icon('../../../../assets/imgs/light-up-1.png', new BMap.Size(36, 36));
      } else if (item.level < 70) { // 二级亮度
        myIcon = new BMap.Icon('../../../../assets/imgs/light-up-2.png', new BMap.Size(36, 36));
      } else { // 三级亮度
        myIcon = new BMap.Icon('../../../../assets/imgs/light-up-3.png', new BMap.Size(36, 36));
      }

      // myIcon.setAnchor(new BMap.Size(16, 38));
      const marker = new BMap.Marker(point, { icon: myIcon });  // 创建标注
      this.map.addOverlay(marker);
      markers.push(marker); // 聚合
      points.push(point); // 聚合
    }

    // 点击点标注事件 - 弹出信息框
    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
      this.openSideBar(marker, this.map, light_list[index], points[index]);


    }
  }

  // 地图点注标-点击事件
  openSideBar(marker, baiduMap, val, point) {
    // console.log(val);
    const that = this;
    // <p style=’font - size: 12px; lineheight: 1.8em; ’> ${ val.name } </p>
    const opts = {
      width: 350,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
    };
    let txt = `
    <p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc;'>灯杆编号： ${val.positionNumber} </p>

    `;
    txt = txt +
     `<p  class='cur-pointer'   id='${val.id}'>设备名称： ${val.description}</p>
     `;

    if (val.offline === true) {// 离线
        // 离线或异常
      txt = txt + `   <p >是否在线： 否</p>`;
      } else {
      txt = txt + `   <p >是否在线： 是</p>`;
      }

    if (val.error === true) {// 离线
      // 离线或异常
      txt = txt + `<p >是否故障： 是</p>`;
    } else {
      txt = txt + `<p >是否故障： 否</p>`;
    }

    txt = txt + `<p >亮度级别： ${val.level}%</p>`;
    txt = txt + `<p >电流强度： ${val.current}A</p>`;
    txt = txt + `<p >电压大小： ${val.volt}V</p>`;
    txt = txt + `<button class='btn btn-bg' style='font-size: 14px; float: right; margin: 5px'>控制</button>`;


    const infoWindow = new BMap.InfoWindow(txt, opts);

    marker.addEventListener('click', function () {
      that.device = val;
      baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口

      setTimeout(() => {
        that.deviceAddEventListener();
      }, 0);
    });

  }

  // 点击子设备
  deviceAddEventListener() {
    const that = this;

      const device = $(`#${this.device.id}`);
      device.on('click', function () {
        console.log('ddd');
        that.deviceChild = that.device.id;
      });

  }

  // 点击关闭操作详情
  closeDetail() {
    this.deviceChild = null;

  }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const zoom = this.zoom = this.switchZone(city.level);
    const fullName = city.full_name;
    console.log(city);

    let pt;

    // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    myGeo.getPoint(fullName, function (point) {
      if (point) {
        baiduMap.centerAndZoom(point, zoom);
        pt = point;

      } else {
        console.log('您选择地址没有解析到结果!');
      }
    }, '');
  }

  // 获取数据

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

  //
  /*
   * 递归查询JSON树 父子节点
   */


  /**
   * 根据NodeID查找当前节点以及父节点
   *
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */

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


  // 路由跳转
  jumpHandle() {

    this.router.navigate([`home/strategy`]);

  }


  // 进入全屏
  enterFullScreen() {
    console.log('进入全屏');
    console.log(this.visible);
    // this.visible = false;
    // localStorage.setItem('visible', 'false');

    // 设置缩放控件偏移量
    // const offset = new BMap.Size(20, 15);
    // this.navigationControl.setOffset(offset);

    // this.communicateService.sendMessage(this.visible); // 发布一条消息
    // this.fullScreenService.enterFullScreen();

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
  // 显示设备
  showDevice() {
    this.deviceshow = true;
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
  // 离开城市
  citylistMouseleave() {
    this.cityshow = false;
  }
  // 离开设备
  devicelistMouseleave() {
    this.deviceshow = false;
  }
  arealistMouseNone() {
    this.areashow = true;
    this.currentBlock = null;
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
