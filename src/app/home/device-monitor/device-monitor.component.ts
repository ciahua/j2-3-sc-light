
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CircleOverlarService } from '../../service/circle-overlay.service';
import { GradOverlar } from '../../service/grad.overlay';
import { MonitorService } from '../../service/monitor.service';


// baidu map
declare let BMap;
declare let $: any;
declare let BMAP_STATUS_SUCCESS;
declare let BMAP_ANCHOR_TOP_LEFT;
declare let BMAP_ANCHOR_BOTTOM_LEFT;

@Component({
  selector: 'app-device-monitor',
  templateUrl: './device-monitor.component.html',
  styleUrls: ['./device-monitor.component.scss']
})
export class DeviceMonitorComponent implements OnInit {

  @ViewChild('map1') map_container: ElementRef;

  map: any; // 地图对象
  markers: any[] = []; // 地图标记
  zoom = 12; // 地图级数

  /*
  model:object
  light_list: array // 灾害数据
  */
  model: any = {}; // 存储数据
  /*
  map_model: object // 城市列表相关
  @currentCity: any // 当前城市安装区域列表
  @currentArea: any // 当前区域
  @cityList: array // 城市列表
  @currentRegion: array // 区域列表一级currentC
  @currentBlock: array // 当前城市街道 = []; // 区域列表2级
  */
  map_model: any = {}; // 存储数据

  currentDevice: any; // // 当前设备点
  // deviceChild: any; // // 当前设备点上-被点击的子设备
  domShow = { // dom 显示对象
    areashow: false, // 默认区域列表不显示
    cityshow: false, // 默认区域列表不显示
    deviceshow: false, // 默认设备列表不显示
    // productshow: false, // 默认产品列表不显示

  };

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  type = 0; // 设备类型id
  typeName: string; // 设备类型名称

  navigationControl: any; // 缩放控件
  queryStr = ''; // 搜索
  deviceModels = []; // 设备型号
  currentDeviceDetail: any; // 搜索设备的信息详情
  @Input()
  public alerts: Array<IAlert> = [];

  constructor(
    private monitorService: MonitorService,
    public router: Router,

  ) {
    this.model.light_list = []; // 城市列表
    this.map_model.deviceList = []; // 城市列表
    this.map_model.cityList = []; // 城市列表
    this.map_model.currentRegion = []; // 区域列表一级
    this.map_model.currentBlock = []; // // 当前城市街道 = []; // 区域列表2级

  }


  ngOnInit() {
    this.getCity(); // 获取城市列表
    this.getDevice(); // 获取设备列表
    this.getModels(); // 获取设备型号
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  // 获取数据 -- 接口
  // 搜索设备
  // 获取详细的位置数据ByDeviceNumber
  getDetailsByDeviceNumber(number) {
    const that = this;
    let point;
    this.monitorService.getDetailsByDeviceNumber(number)
      .subscribe({
        next: function (val) {
          that.currentDevice = val; // 该点上的位置
          point = new BMap.Point(val.point.lng, val.point.lat); // 坐标可以通过百度地图坐标拾取器获取
          that.map.centerAndZoom(point, 19); // 设置中心和地图显示级别
          that.remove_overlay(that.map);
          that.addMarker(); // 获取数据-添加标注


        },
        complete: function () {
          that.openSideBar1();
          // setTimeout(() => {
          //   that.findPoint(point);   // 搜索设备

          // }, 100);
        },
        error: function (error) {
          let message;
          if (error.error.errors) {
            message = error.error.errors[0].defaultMessage;
          } else {
            message = '结果不唯一！';
          }
          that.alerts[0] = {
            id: 1,
            type: 'danger',
            message: message,
          };
          that.alerts.map((alert: IAlert) => Object.assign({}, alert));
        }
      });
  }
    // 获取设备信息
  getDeviceByName(number) {
    const that = this;
    this.monitorService.getDeviceByName(number)
      .subscribe({
        next: function (val) {
          that.currentDeviceDetail = val[0]; // 该点上的位置
          console.log(val);
        },
        complete: function () {
        },
        error: function (error) {

        }
      });
  }


  // 获取设备型号
  getModels() {
    const that = this;
    this.monitorService.getModels()
      .subscribe({
        next: function (val) {
          that.deviceModels = val;
        },
        complete: function () {
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  getModel(id) {
    let name = '';
    this.deviceModels.map(item => {
      if (id === item.id) {
        name = item.name;
      }
    });
    return name;
  }

  // 第一步
  // 获取安装区域列表 --ok
  getCity() {
    const that = this;
    this.monitorService.getZoneDefault().subscribe({
      next: function (val) {
        that.map_model.cityList = val.regions; // 安装区域列表
        that.map_model.zone = val.zone; // 第一个显示的安装区域列表
        // that.node = that.getNode(val.regions, val.zone.region_id);
        that.node = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
        that.map_model.currentCity = that.node; // 当前城市
        that.map_model.currentRegion = that.node.children; // 当前区域
      },
      complete: function () {
        that.addBeiduMap(); // 第二步 创建地图
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 获取设备列表 -- ok
  getDevice() {
    const that = this;
    this.monitorService.getDevice().subscribe({
      next: function (val) {
        that.map_model.deviceList = val;
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }


  //  获取按区域汇总的位置数据 --ok
  getRegion(length, color, mouseoverColor) {
    const that = this;
    let value;
    const zoom = this.map.getZoom(); // 地图级数
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const ne = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const sw = Bounds.getSouthWest(); // 返回矩形区域的西南角
    const type = this.type; // 设备类型
    const level = this.switchLevel(zoom) + 1;
    this.monitorService.getRegions(sw, ne, level, type).subscribe({
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
  getDetails(sw: any, ne: any, zoom: Number) {
    const that = this;
    const type = this.type;
    let value;
    this.monitorService.getDetails(sw, ne, zoom, type).subscribe({
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

  // // 获取指定位置所挂设备参数定义
  getDeviceDetails(positionId: string, deviceType: Number) {
    let value;
    const that = this;
    this.monitorService.getDeviceDetails(positionId, deviceType).subscribe({
      next: function (val) {
        value = val;
      },
      complete: function () {
        that.currentDevice.deviceChild = value;

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 标注消息列表中点击的路灯事件   // 搜索设备
  findPoint(point) {
    let marker;
    const makers = this.map.getOverlays();
    for (let index = 0; index < makers.length; index++) {
      const element = makers[index];
      const lat = element.point && element.point.lat;
      const lng = element.point && element.point.lng;
      if (point.lat === lat && point.lng === lng) {
        marker = element;
        if (marker) {
          marker.V.click();
        }
      }
    }
  }


  // 点击搜索按钮，开始搜索
  execQueryId() {
    if (this.queryStr === '' || !this.queryStr) {
      return;
    }
    this.getDetailsByDeviceNumber(this.queryStr);
    this.getDeviceByName(this.queryStr);

  }

// 第二步 创建地图
  // 百度地图API功能
  addBeiduMap() {
    const city = this.map_model.currentCity;
    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      // minZoom: 11,
    }); // 创建地图实例
    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    // const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    const point = new BMap.Point(this.map_model.zone.center.lng, this.map_model.zone.center.lat); // 坐标可以通过百度地图坐标拾取器获取
    console.log('this.zoom');
    this.zoom = this.switchZoom(this.map_model.zone.level);
    console.log(this.zoom);
    map.centerAndZoom(point, this.zoom); // 设置中心和地图显示级别
    map.setMapStyle({ style: 'grayscale' });
    this.getPoint(map, city); // 坐标可以通过百度地图坐标拾取器获取
    // 地图类型控件
    map.addControl(new BMap.MapTypeControl());
    const offset = new BMap.Size(20, 60);
    const navigationControl = this.navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);
    const top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new BMap.Size(20, 85) }); // 左上角，添加比例尺
    map.addControl(top_left_control);
    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    this.dragendOff(map);
    this.zoomendOff(map);
    this.mapClickOff(map);
  }

  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      if (that.currentDevice && that.currentDevice.deviceChild) {
        that.currentDevice.deviceChild = null;
      }

    });
  }

  // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
  dragendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('dragend', function () {
      that.remove_overlay(baiduMap);
      that.addMarker(); // 获取数据-添加标注
    });
  }
  // 监控-地图缩放事件-地图缩放后的级别。
  zoomendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('zoomend', function () {
      that.remove_overlay(baiduMap);
      that.addMarker(); // 添加标注
    });

  }



  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const zoom = this.switchZoom(city.level);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);
    that.addMarker(); // 获取数据-添加标注
  }

  // 省市区街道-地图级别
  switchZoom(level) {
    let zoom = 12;
    switch (level) {
      case 0:
      case 1:
        zoom = 10;
        break;
      case 2:
        zoom = 12;
        break;
      case 3:
        zoom = 15;
        break;
      case 4:
        zoom = 19;
        break;
      default:
        break;
    }
    return zoom;
  }

  // 省市区街道-地图级别
  switchLevel(zone) {
    let level = 2;
    if (zone <= 10) {
      level = 1;
    } else if (zone <= 13 && zone > 10) {
      level = 2;
    } else if (zone <= 16 && zone > 13) {
      level = 3;
    } else {
      level = 4;
    }
    return level;
  }


  // 清除覆盖物
  remove_overlay(baiduMap) {
    baiduMap.clearOverlays();
  }

  // 根据级别获取数据-锚点
  addMarker() {
    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const ne = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const sw = Bounds.getSouthWest(); // 返回矩形区域的西南角
    const zoom = this.map.getZoom();
    let length, color, mouseoverColor;
    if (zoom <= 13) {
      length = 90;
      color = '#87a2b7';
      mouseoverColor = '#9bd9dd';
      that.getRegion(length, color, mouseoverColor);
    } else if (zoom <= 16 && zoom > 13) {
      length = 90;
      color = '#87a2b7';
      mouseoverColor = '#9bd9dd';
      that.getRegion(length, color, mouseoverColor);
    } else {
      that.getDetails(sw, ne, zoom);
    }

  }

  // 添加点标注
  addPoint(val) {
    this.markers = [];
    const points: any[] = [];
    const that = this;
    val.map((item, i) => {
      const pt = new BMap.Point(item.point.lng, item.point.lat);
      // 添加自定义覆盖物
      let mySquare;
      if (item.with_error && item.with_error === true) { // 异常
        mySquare = new GradOverlar(pt, 36, 'tag-red');
      } else if (item.with_offline === false) { // 掉线
        mySquare = new GradOverlar(pt, 36, 'tag-grad');
      } else { // 正常
        mySquare = new GradOverlar(pt, 36, 'tag-bule');
      }
      that.map.addOverlay(mySquare);
      that.markers.push(mySquare); // 聚合
      points.push(pt); // 聚合

    });

    // 点击点标注事件
    for (let index = 0; index < that.markers.length; index++) {
      const marker = that.markers[index];
      that.openSideBar(marker, that.map, val[index], points[index]);
    }
  }

  // 添加圆形标注
  addCirCle(val, length, color, mouseoverColor) {
    this.markers = [];
    const that = this;
    val.map((item, i) => {
      const pt = new BMap.Point(item.center.lng, item.center.lat);
      const name = item.name;
      const count = item.count;
      // 添加自定义覆盖物
      const mySquare = new CircleOverlarService(pt, name, count, length, color, mouseoverColor);
      that.map.addOverlay(mySquare);
      that.markers.push(mySquare); // 聚合
    });
    // 点击圆形标注事件
    for (let index = 0; index < that.markers.length; index++) {
      const marker = that.markers[index];
      const item = val[index];
      this.setZoom(marker, this.map, item);
    }
  }


  // 圆圈区域点击事件
  setZoom(marker, baiduMap, item) {
    let zoom = this.map.getZoom();
    switch (zoom) {
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
      default:
        break;
    }
    marker.V.addEventListener('click', function () {
      const point = new BMap.Point(item.center.lng, item.center.lat); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
      baiduMap.centerAndZoom(point, zoom); // 设置中心和地图显示级别
    });
  }

  // 点注标点击事件
  openSideBar(marker, baiduMap, val, point) {
    const that = this;
    const opts = {
      width: 0,     // 信息窗口宽度
      enableAutoPan: true, // 自动平移
    };
    let txt = `
    <p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'> 编号 | ${val.number} </p>
    `;
    if (val.device_types) {
      for (let index = 0; index < val.device_types.length; index++) {
        txt = txt + `<p  class='cur-pointer'  id='${val.device_types[index].id}'> ${val.device_types[index].name}</p>`;

      }
    }

    const infoWindow = new BMap.InfoWindow(txt, opts);
    marker.V.addEventListener('click', function () {
      that.currentDevice = val;
      baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
      setTimeout(() => {
        that.deviceAddEventListener();
      }, 0);
    });

  }

  openSideBar1() {
    const that = this;
    const opts = {
      width: 0,     // 信息窗口宽度
      enableAutoPan: true, // 自动平移
    };
    let txt = `
    <p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'> 编号 | ${that.currentDevice.number}
     </p>
    `;
    if (that.currentDevice.device_types) {
      for (let index = 0; index < that.currentDevice.device_types.length; index++) {
        txt = txt +
         `<p  class='cur-pointer'  id='${that.currentDevice.device_types[index].id}'> ${that.currentDevice.device_types[index].name}</p>`;

      }
    }

    const infoWindow = new BMap.InfoWindow(txt, opts);
    // that.currentDevice = val;
    console.log(1);
    console.log(that.currentDevice.point);
    const point = new BMap.Point(that.currentDevice.point.lng, that.currentDevice.point.lat);
    that.map.openInfoWindow(infoWindow, point); // 开启信息窗口
    setTimeout(() => {
      that.deviceAddEventListener();
    }, 0);
    // if (this.currentDevice.device_types) {
    //   for (let index = 0; index < this.currentDevice.device_types.length; index++) {
    //     const positionId = this.currentDevice.id;
    //     const deviceType = this.currentDevice.device_types[index].id;
    //     that.getDeviceDetails(positionId, deviceType);
    //   }
    // }
    that.getDeviceDetails(this.currentDevice.id, that.currentDeviceDetail.typeId);
  }

  // 点击子设备
  deviceAddEventListener() {
    const that = this;
    if (this.currentDevice.device_types) {
      for (let index = 0; index < this.currentDevice.device_types.length; index++) {
        const positionId = this.currentDevice.id;
        const deviceType = this.currentDevice.device_types[index].id;
        const device = $(`#${deviceType}`);
        device.on('click', function () {
          that.getDeviceDetails(positionId, deviceType);
        });
      }
    }

  }

  // 点击关闭操作详情
  closeDetail() {
    this.currentDevice.deviceChild = null;
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
        const mk = new BMap.Marker(r.point);
        baidumap.addOverlay(mk); // 标注当前位置
        // 在创建地图实例后，我们需要对其进行初始化，BMap.Map.centerAndZoom()方法要求设置中心点坐标和地图级别。 地图必须经过初始化才可以执行其他操作。
        baidumap.centerAndZoom(r.point, 17); // 设置中心和地图显示级别
      } else {
        alert('failed' + this.getStatus());
      }
    }, { enableHighAccuracy: true });
  }


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

    return that.node;
  }


  // 选择城市
  selecteCity(city) {
    this.map_model.currentCity = city;
    this.node = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.map_model.currentRegion = city.children;
  }

  // 选择区域
  selecteblock(block) {
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
    this.map_model.currentArea = block;
  }

  // 选择设备
  selecteDevice(device) {
    this.type = device.id;
    this.typeName = device.name;
    console.log(this.type);
    this.remove_overlay(this.map);
    this.addMarker();

  }

  // selecteDeviceNone
  selecteDeviceNone() {
    this.type = 0;
    this.typeName = null;
    this.remove_overlay(this.map);
    this.addMarker();

  }

  // 选择设备

  // 显示区域
  showArea() {
    this.domShow.areashow = true;
  }
  // 显示城市
  showCiyt() {
    this.domShow.cityshow = true;
  }
  // 显示设备
  showDevice() {
    this.domShow.deviceshow = true;
  }


  // 选择区域
  arealistMouseover(area) {

    this.map_model.currentBlock = area.children;
  }


  // 离开区域
  arealistMouseleave() {
    this.domShow.areashow = false;
    this.map_model.currentBlock = [];
  }
  // 离开城市
  citylistMouseleave() {
    this.domShow.cityshow = false;
  }
  // 离开设备
  devicelistMouseleave() {
    this.domShow.deviceshow = false;
  }

  arealistMouseNone() {
    this.domShow.areashow = true;
    this.map_model.currentBlock = [];
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}

// 标注消息列表中点击的路灯事件

/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: 	monitor.component.ts
@time: 2018 / 7 / 2 17: 18

*/
