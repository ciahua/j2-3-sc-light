import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/';

import { CircleOverlarService } from '../../service/circle-overlay.server';
import { GradOverlar } from '../../service/grad.overlay';
import { RedOverlar } from '../../service/red-overlay';
import { UrlService } from '../../service/url.service';


import { Point } from '../../data/point.type';
import { METEOROLOGY } from '../../data/meteorology-list';
import { MonitorService } from '../../service/monitor.service';
import { MessService } from '../../service/mess.service';
import { FullScreenService } from '../../service/full-screen.service';
import { CommunicateService } from '../../service/communicate.service';

// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_STATUS_SUCCESS;
declare let BMAP_ANCHOR_TOP_LEFT;
declare let BMAP_ANCHOR_BOTTOM_RIGHT;
declare let BMAP_ANCHOR_BOTTOM_LEFT;
declare let BMAP_ANIMATION_BOUNCE;

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  @ViewChild('map3') map_container: ElementRef;

  map: any; // 地图对象
  markers: any[] = []; // 标记
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
  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点
  zoom: any; // 地图级数
  SouthWest: Point; // 地图视图西南角
  NorthEast: Point; // 地图视图东北角
  queryPoint: any; // 路由传递的数据
  isqueryPoint = false; // 是否从路由点的异常信息点的数据
  subscription: Subscription; // 用于订阅事件
  meteorology = METEOROLOGY; // 气象
  visible = true; // 控制可视区域
  navigationControl: any; // 缩放控件

  constructor(
    private monitorService: MonitorService, private config: NgbDropdownConfig, private activatedRoute: ActivatedRoute,
    public messService: MessService, public router: Router, public urlService: UrlService,
    public fullScreenService: FullScreenService, private communicateService: CommunicateService
    ) {
    this.zoom = 12; // 默认
    // config.placement = 'bottom-left';

    this.visible = urlService.getURLParam('visible') === '' ? true : false;



    this.subscription = this.messService.Status$.subscribe(message => {
      this.queryPoint = message;
      this.isqueryPoint = true;

      this.goTothePoint(this.map);
    });

  }


  ngOnInit() {

    this.getCity(); // 获取城市列表
    this.getDevice(); // 获取设备列表
    const that = this;

    window.onresize = function () {
      if (!that.checkFull()) {
        // 要执行的动作
        console.log('你按下了Esc');
        that.exitFullScreen();
      }
    };

  }

  checkFull() {
    let isFull: any;
    // isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
    isFull = document.fullscreenEnabled || document.webkitIsFullScreen;

    if (isFull === undefined) {
      isFull = false;
    }
    return isFull;
  }

  // 百度地图API功能
  addBeiduMap() {
    const city = this.defaultZone;
    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, this.zoom); // 设置中心和地图显示级别
    this.getPoint(map, city); // 坐标可以通过百度地图坐标拾取器获取

    // 地图类型控件
    map.addControl(new BMap.MapTypeControl());
    // map.setCurrentCity('广州');

    // 添加控件缩放
    const offset = this.visible === true ? new BMap.Size(20, 140) : new BMap.Size(20, 15);
    const navigationControl = this.navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);

    const top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new BMap.Size(20, 85) }); // 左上角，添加比例尺
    map.addControl(top_left_control);

    // map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom(true); // 连续缩放效果，默认禁用

    this.dragendOff(map);
    this.zoomendOff(map);
    this.mapClickOff(map);



  }


  // 具体的点

  // 跳到控制台地图的具体的点
  goTothePoint(baiduMap) {
    const that = this;
    const pt = new BMap.Point(this.queryPoint.lng, this.queryPoint.lat); // 选择的点的坐标
    // const mk = new BMap.Marker(pt);
    const message = this.queryPoint.message; // 异常信息
    const parent = this.queryPoint.parent; // 父亲信息
    const zoom = baiduMap.getZoom(); // 当前地图级别
    let mySquare; // 自定义标注

    baiduMap.setZoom(19); // 放大地图
    baiduMap.panTo(pt); // 地图中心移动到这个点


    if (this.zoom !== zoom) {
      this.remove_overlay(baiduMap); // 清除覆盖物
    }

    if (parent.is_exception && parent.is_exception === 1) { // 异常
      mySquare = new GradOverlar(pt, 50, 'tag-red');
      // console.log('异常');
    } else if (parent.is_online === 0) { // 掉线
      mySquare = new GradOverlar(pt, 50, 'tag-grad');
      // console.log('掉线');
    } else { // 正常
      mySquare = new GradOverlar(pt, 50, 'tag-bule');
      // console.log('正常');

    }

    this.map.addOverlay(mySquare);

    // this.overMessage( baiduMap, pt, message); // 添加文字

    this.openSideBar(mySquare, baiduMap, parent, pt); // 弹出信息框
    // console.log(this.markers);
    setTimeout(() => {
      console.log('click');
      console.log(mySquare.V);
      mySquare.V.click();
    }, 50);


  }

  // 创建文本标注对象
  overMessage(baiduMap, pt, message) {
    const that = this;
    const opts = {
      position: pt,    // 指定文本标注所在的地理位置
      // offset: new BMap.Size(30, -30)    // 设置文本偏移量
      offset: new BMap.Size(0, 0)    // 设置文本偏移量
    };
    const label = new BMap.Label(message, opts);  // 创建文本标注对象
    label.setStyle({
      color: 'red',
      fontSize: '12px',
      height: '20px',
      lineHeight: '20px',
      fontFamily: '微软雅黑'
    });
    baiduMap.addOverlay(label);
  }

  // 信息窗口
  openMessage(marker, baiduMap, pt) {
    const that = this;
    // <p style=’font - size: 12px; lineheight: 1.8em; ’> ${ val.name } </p>
    const opts = {
      width: 100,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: val.name, // 信息窗口标题
      enableMessage: true, // 设置允许信息窗发送短息
    };
    const txt = `
    <ul device-mes>
      <li class='cur-pointer '><a>灯</a> </li>
      <li class='cur-pointer '><a>井盖</a></li>
      <li class='cur-pointer '><a>环境箱</a></li>
      <li class='cur-pointer '><a>气象箱</a></li>
    </ul>
    `;
    const infoWindow = new BMap.InfoWindow(txt, opts);
    baiduMap.openInfoWindow(infoWindow, pt);

  }


  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const zoom = this.zoom = this.switchZone(city.level);
    const name = city.name;

    let pt;

    // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    myGeo.getPoint(name, function (point) {
      if (point) {
        const p = new BMap.Point(113.920522, 22.496739); // 坐标可以通过百度地图坐标拾取器获取(万融大厦)
        baiduMap.centerAndZoom(p, zoom);
        // baiduMap.centerAndZoom(point, zoom);
        pt = point;
        // myGeo.getLocation(pt, function (rs) {
        //   const addComp = rs.addressComponents;
        //   console.log(addComp.province + ', ' + addComp.city +
        //    ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber);
        // });

        that.addMarker(); // 获取数据-添加标注
      } else {
        console.log('您选择地址没有解析到结果!');
      }
    }, that.currentCity.name);
  }





  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.deviceChild = null;
    });
  }

  // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
  dragendOff(baiduMap ) {
    baiduMap.addEventListener('dragend', function () {
      const center = baiduMap.getCenter();
      console.log('地图中心点变更为：' + center.lng + ', ' + center.lat);
    });
  }
  // 监控-地图缩放事件-地图缩放后的级别。
  zoomendOff(baiduMap) {
    const that =  this;

    // baiduMap.addEventListener('zoomend', function () {
    //   that.zoom = baiduMap.getZoom();
    //   that.remove_overlay(baiduMap);
    //   that.addMarker(); // 添加标注
    //   console.log('地图缩放至：' + baiduMap.getZoom() + '级');
    // });

    baiduMap.addEventListener('zoomend', function () {
      if (that.isqueryPoint === true) {
        console.log('地图缩放事件-点击消息列表事件');
        that.isqueryPoint = false;
      } else {
        console.log('地图缩放事件');
        that.zoom = baiduMap.getZoom();
        that.remove_overlay(baiduMap);
        that.addMarker(); // 添加标注
        console.log('地图缩放至：' + baiduMap.getZoom() + '级');

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

  // 选择城市
  selecteCity(city) {
    this.currentCity = city;
    const id = city.id;
    const name = city.name;
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


  // 获取数据

  // 获取城市列表
  getCity() {
    const that = this;

    this.monitorService.getCity().subscribe({
      next: function (val) {
        that.cityList = val.regions;
        that.defaultZone = val.zone;
        that.currentCity = val.currentCity;
        that.zoom = that.switchZone(val.zone.level);
        that.currentChildren = that.getNode(val.regions, val.zone.id);

      },
      complete: function () {
        that.addBeiduMap(); // 创建地图

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 获取设备列表
  getDevice() {
    const that = this;

    this.monitorService.getDevice().subscribe({
      next: function (val) {
        that.deviceList = val;

      },
      complete: function () {


      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 获取区域
  getRegion(sw: Point, ne: Point, zoom: Number,  length, color, mouseoverColor) {
    const that = this;
    let value;
    this.monitorService.getRegion(sw, ne, zoom).subscribe({
      next: function (val) {
        value = val;

      },
      complete: function () {

        that.addCirCle(value, length, color, mouseoverColor);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 获取街道
  getBlock(sw: Point, ne: Point, zoom: Number, length, color, mouseoverColor) {
    const that = this;
    let value;
    this.monitorService.getBlock(sw, ne, zoom).subscribe({
      next: function (val) {
        value = val;
      },
      complete: function () {
        that.addCirCle(value, length, color, mouseoverColor);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 获取详情
  getCommunity(sw: Point, ne: Point, zoom: Number) {
    const that = this;
    let value;
    this.monitorService.getCommunity(sw, ne, zoom).subscribe({
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


  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角

  }

  // 清除覆盖物
  remove_overlay(baiduMap) {
    baiduMap.clearOverlays();
  }

  // 根据级别获取数据-锚点
  addMarker() {
    console.log('获取数据');
    this.getBounds(this.map); // 获取可视区域
    const that = this;
    const zoom = this.zoom;
    const sw = this.SouthWest;
    const ne = this.NorthEast;
    let length, color, mouseoverColor;
    switch (zoom) {
      case 11:
      case 12:
      case 13:
        // val = REGIONLIST.val.region_list;
        console.log('region_list');
        length = 90;
        color = '#56c5ff';
        mouseoverColor = '#f60';
        that.getRegion(sw, ne, zoom, length, color, mouseoverColor);
        break;
      case 14:
      case 15:
      case 16:
        // val = BLOCKLIST.val.block_list;
        console.log('block_list');
        length = 70;
        color = '#618d99';
        mouseoverColor = '#f60';
        that.getBlock(sw, ne, zoom, length, color, mouseoverColor);
        break;
      case 17:
      case 18:
      case 19:
      case 20:
        // val = COMMUNITYLIST.val.community_list;
        console.log('community_list');
        length = 20;
        color = '#e54b00';
        mouseoverColor = '#f60';
        that.getCommunity(sw, ne, zoom);
        break;
      default:
        break;
    }

  }

  // 添加点标注
  addPoint(val) {
    // console.log('标注');
    // console.log(this.markers);
    this.markers = [];
    const points: any[] = [];
    const that = this;
    val.map((item, i) => {
      const pt = new BMap.Point(item.lng, item.lat);
      const name = item.name;
      // const mk = new BMap.Marker(pt); // 默认标注
      // that.map.addOverlay(mk);
      // markers.push(mk);

      // 添加自定义覆盖物
      let mySquare;
      if (item.is_exception && item.is_exception === 1) { // 异常
        mySquare = new GradOverlar(pt, 50, 'tag-red');
        // console.log('异常');
      } else if (item.is_online === 0) { // 掉线
        mySquare = new GradOverlar(pt, 50, 'tag-grad');
        // console.log('掉线');
      } else { // 正常
        mySquare = new GradOverlar(pt, 50, 'tag-bule');
        // console.log('正常');

      }


      that.map.addOverlay(mySquare);

      that.markers.push(mySquare); // 聚合
      points.push(pt); // 聚合

    });

    // 点击点标注事件
    for (let index = 0; index < that.markers.length; index++) {
      const marker = that.markers[index];
      // console.log(val[index]);
      that.openSideBar(marker, that.map, val[index], points[index]);
    }
  }

  // 添加圆形标注
  addCirCle(val, length, color, mouseoverColor) {
    this.markers = [];
    const that = this;
    // const markers: any[] = [];
    val.map((item, i) => {

      const pt = new BMap.Point(item.lng, item.lat);
      const name = item.name;

      // const myIcon = this.makeIcon(item.type);
      // const marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注-图片icon
      // this.map.addOverlay(marker2);              // 将标注添加到地图中

      // 添加自定义覆盖物
      const mySquare = new CircleOverlarService(pt, name, length, color, mouseoverColor);
      that.map.addOverlay(mySquare);

      that.markers.push(mySquare); // 聚合


    });

    // 点击圆形标注事件

    for (let index = 0; index < that.markers.length; index++) {
      const marker = that.markers[index];
      this.setZoom(marker, this.map);
    }
  }


// 圆圈区域点击事件
  setZoom(marker, baiduMap) {
    const that = this;
    let zoom = this.zoom;
    switch (this.zoom) {
      case 11:
      case 12:
      case 13:
        zoom = 15;
        break;
      case 14:
      case 15:
      case 16:
        zoom = 17;
        break;
      case 17:
      case 18:
      case 19:
      case 20:

        break;
      default:
        break;
    }
    marker.V.addEventListener('click', function () {

      baiduMap.setZoom(zoom);
    });
  }

  // 点注标点击事件
  openSideBar(marker, baiduMap, val, point) {
    const that = this;
    // <p style=’font - size: 12px; lineheight: 1.8em; ’> ${ val.name } </p>
    const opts = {
      width: 0,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
    };
    let txt = `
    <p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc;'> ${val.name} | ${val.id } </p>

    `;
    for (let index = 0; index < val.children.length; index++) {
      if (val.children[index].is_online === 0 || val.children[index].is_exception === 1) {
        // 离线或异常
        txt = txt + `<p  class='cur-pointer' style='color:red;'  id='${val.children[index].id}'> ${val.children[index].name}</p>`;
      } else {
        txt = txt + `<p  class='cur-pointer'  id='${val.children[index].id}'> ${val.children[index].name}</p>`;
      }

    }

    const infoWindow = new BMap.InfoWindow(txt, opts);

    marker.V.addEventListener('click', function () {
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
    for (let index = 0; index < this.device.children.length; index++) {
      const device = $(`#${this.device.children[index].id}`);
      device.on('click', function () {
        console.log('click');
        // console.log(device);
        that.deviceChild = that.device.children[index];
      });
    }
  }

  // 点击关闭操作详情
  closeDetail() {
    this.deviceChild = null;
    console.log('close');
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

  // 获取marker的位置
  getAttr(marker) {
    const p = marker.getPosition();
    alert('marker的位置是' + p.lng + ',' + p.lat);
  }

  // 获取当前位置坐标 // 设置中心和地图显示级别
  getGeolocation(baidumap) {
    const geolocation = new BMap.Geolocation(); // 获取当前位置坐标
    geolocation.getCurrentPosition(function (r) {

    if (this.getStatus() === BMAP_STATUS_SUCCESS) {
      // fun(r);
      const mk = new BMap.Marker(r.point);
      baidumap.addOverlay(mk); // 标注当前位置

      // 在创建地图实例后，我们需要对其进行初始化，BMap.Map.centerAndZoom()方法要求设置中心点坐标和地图级别。 地图必须经过初始化才可以执行其他操作。
      baidumap.centerAndZoom(r.point, 17); // 设置中心和地图显示级别
    } else {
      alert('failed' + this.getStatus());
    }
  }, { enableHighAccuracy: true });
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
    return that.node && that.node.children ;
  }
  // 路由跳转-传递参数-这是在html中绑定的click跳转事件
  jumpHandle() {
    this.router.navigate([`home/video`]);

  }

  // 打开新页面
  addURLParamAddOpen() {
    console.log(window.location.href);
    // const href = window.location.href;
    this.urlService.addURLParamAddOpen('visible', 'false');
    localStorage.setItem('visible', 'false');

  }



  // 进入全屏
  enterFullScreen() {
    // this.urlService.addURLParam('visible', 'false');
    this.visible = false;
    localStorage.setItem('visible', 'false');
    console.log('全屏');
    // 设置缩放控件偏移量
    const offset = new BMap.Size(20, 15);
    this.navigationControl.setOffset(offset);

    this.communicateService.sendMessage(this.visible); // 发布一条消息
    this.fullScreenService.enterFullScreen();

  }


  // 退出全屏
  exitFullScreen() {
    // this.urlService.addURLParam('visible', 'false');
    this.visible = true;
    localStorage.setItem('visible', 'true');
    console.log('全屏');
    // 设置缩放控件偏移量
    const offset = new BMap.Size(20, 140);
    this.navigationControl.setOffset(offset);

    this.communicateService.sendMessage(this.visible); // 发布一条消息
    // this.fullScreenService.exitFullScreen();

  }










}
