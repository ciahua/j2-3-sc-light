import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorService } from '../../../service/monitor.service';
import { AirmonitorService } from '../../../service/airmonitor.service';
// import { AIRDATALIST } from '../../../data/air-data';
import { Point } from '../../../data/point.type';
import { CircleOverlarAirService } from '../../../service/circle-overlay-air.service';

// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_BOTTOM_RIGHT;
declare let BMAP_ANCHOR_TOP_RIGHT;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.scss']
})
export class AirComponent implements OnInit, OnDestroy {

  @ViewChild('map6') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentChildren: any; // 当前城市节点
  currentBlock: any; // 当前城市街道
  currentAirIndex: any; // 当前空气指标选项

  visible = true; // 控制可视区域
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  zoom: any; // 地图级数

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  SouthWest: Point; // 地图视图西南角
  NorthEast: Point; // 地图视图东北角
  airdevicelist = []; // 空气检测设备列表
  indexofHtml: any;
  allIndexs = [
    {
      id: '',
      name: 'PM2.5'
    },
    {
      id: '',
      name: 'PM10'
    },
    {
      id: '',
      name: 'TVOC'
    },
    {
      id: '',
      name: '温度'
    },
    {
      id: '',
      name: '湿度'
    },
  ];
  timer: any; // 定时器
  // pm25list = AIRDATALIST.list;

  constructor(private monitorService: MonitorService, private airmonitorService: AirmonitorService,
    public router: Router) {
      this.indexofHtml = this.allIndexs[0];
      this.currentAirIndex = 'PM2.5';
    }
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
    const point = new BMap.Point(113.950723, 22.558888); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 15); // 设置中心和地图显示级别
    // map.setMapStyle({ style: 'googlelite' });

    // 添加控件缩放
    const offset = new BMap.Size(20, 55);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);

    this.getAirdevices(); // 获取地图上的点
    this.timer = setInterval(() => {
      this.getAirdevices(); // 获取地图上的点
    }, 5000);

    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    // const marker = new BMap.Marker(point);  // 创建标注
    // map.addOverlay(marker);               // 将标注添加到地图中
    this.dragendOff(map);
    this.zoomendOff(map);
  }

  // 添加地图内的设备标记

  // 监控-拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
  dragendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('dragend', function () {
      that.airdevicelist = [];
      baiduMap.clearOverlays();
      that.getAirdevices(); // 获取数据-添加标注
    });
  }
  // 监控-地图缩放事件-地图缩放后的级别。
  zoomendOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('zoomend', function () {
      // if (that.isqueryPoint === true) {
      //   that.isqueryPoint = false;
      // } else {
        that.airdevicelist = [];
        baiduMap.clearOverlays();
        that.getAirdevices(); // 添加标注
        // console.log('地图缩放至：' + baiduMap.getZoom() + '级');
      // }
    });
  }

  // 获取设备坐标点
  getAirdevices() {
    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    localStorage.setItem('NE', JSON.stringify(NorthEast));
    localStorage.setItem('SW', JSON.stringify(SouthWest));

    let compar;
    let value;
    this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
      next: function (val) {
        // value = val;
        const curIndex = that.currentAirIndex;
        compar = that.comparison(that.airdevicelist, val);
        // console.log(compar);
        value = that.judgeChange(compar.a_arr, compar.b_arr, curIndex);

        that.changeMarker(value); // 替换
        that.deleMarker(compar.a_surplus); // 删除
        // that.deleMarker(value); // 删除
        that.addCertainMarker(compar.b_surplus, curIndex); // 添加
        // that.addPoint(value); // 添加

        that.airdevicelist = val; // 变为新值
      },
      complete: function () {
        // that.addCertainMarker(value, that.currentAirIndex);
      },
      error: function (error) {
        console.log(error);
        console.log(NorthEast);
        console.log(SouthWest);
      }
    });
  }

  // 交并补
  comparison(a, b) {
    const a_arr: any[] = [];
    const b_arr: any[] = [];
    const a_surplus: any[] = [];
    const b_surplus: any[] = [];
    let i = 0;
    for (let j = 0; j < b.length; j++) {
      while (i < a.length && a[i].id < b[j].id) {
        a_surplus.push(a[i]);
        i++;
      }
      if (i >= a.length || a[i].id > b[j].id) {
        b_surplus.push(b[j]);
      } else {
        a_arr.push(a[i]);
        i++;
        b_arr.push(b[j]);
      }
    }
    return {
      a_arr: a_arr,
      b_arr: b_arr,
      a_surplus: a_surplus,
      b_surplus: b_surplus,
    };
  }
  // 判断变化值
  judgeChange(a, b, curIndex) {
    const changePoint: any[] = [];
    const length = a.length < b.length ? a.length : b.length;
    let value;
    switch (curIndex) {
      case 'PM2.5': value = 'pm25'; break;
      case 'PM10': value = 'pm10'; break;
      case 'TVOC': value = 'tvoc'; break;
      case '温度': value = 'temperature'; break;
      case '湿度': value = 'humidity'; break;
      default: break;
    }

    for (let index = 0; index < length; index++) {
      const a_element = a[index];
      const b_element = b[index];
      if (a_element.error !== b_element.error ||
        a_element.offline !== b_element.offline ||
        a_element[value] !== b_element[value]
       ) {
        changePoint.push(b_element);
      }

    }
    return changePoint;

  }

  // 替换
  changeMarker(airdevice_list) {
    // console.log(airdevice_list);
    // console.log(this.airdeviceList);
    this.deleMarker(airdevice_list); // 删除
    this.addCertainMarker(airdevice_list, this.currentAirIndex); // 添加
  }
  // 删除
  deleMarker(airdevice_list) {
    const makers = this.map.getOverlays();
    for (let ind = 0; ind < airdevice_list.length; ind++) {
      const ele = airdevice_list[ind];
      const point = airdevice_list[ind].point;
      for (let index = 0; index < makers.length; index++) {
        const element = makers[index];
        const lat = element.point && element.point.lat;
        const lng = element.point && element.point.lng;
        if (point.lat === lat && point.lng === lng) {
          this.map.removeOverlay(makers[index]);
        }

      }
    }
  }

  // 根据当前空气指标加载对应图标
  addCertainMarker(val, index) {
    const markers = [];
    const points: any[] = [];

    const that = this;
    const length = 60;  // 图标大小
    let color;  // 背景色
    color = '#4eb4cf'; // 按不同指标对应不同背景色，待确定
    const name = index; // 圆形图标中显示的名字
    let indexvalue; // 圆形图标中显示的值
    const mouseoverColor = '#9bd9dd';  // 划过背景色

    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      let myIcon;
      switch (index) {
        case 'PM2.5': indexvalue = item.pm25; break;
        case 'PM10': indexvalue = item.pm10; break;
        case 'TVOC': indexvalue = item.tvoc; break;
        case '温度': indexvalue = item. temperature + ' °C'; break;
        case '湿度': indexvalue = item.humidity; break;
        default: break;
      }
      // 添加覆盖物图标
      myIcon = new CircleOverlarAirService(point, name, indexvalue, length, color, mouseoverColor);
      this.map.addOverlay(myIcon);

      markers.push(myIcon); // 聚合
      points.push(point);
    });
    // 点击点标注事件
    for (let indexl = 0; indexl < markers.length; indexl++) {
      const marker = markers[indexl];
      const item = val[indexl];
      that.openSideBar(marker, that.map, item, points[indexl]);
    }
  }

  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
    this.zoom = baiduMap.getZoom(); // 地图级别

  }

  // 地图点注标-点击事件
  openSideBar(marker, baiduMap, airDevice, point) {
    // console.log(airDevice);
    const that = this;
    const opts = {
      width: 350,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
      // border-radius: 5px,
    };  // ${airDevice.id} ${airDevice.description}
    let txt = `<p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc;'>设备编号 | ${airDevice.name} </p>`;
    txt = txt + `<p class='cur-pointer'> 设备名称：${airDevice.description}</p>`;
    if (airDevice.offline === false) {
      txt = txt + `<p  class='cur-pointer'> 是否离线：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否离线：<span style='color: red'>是</span></p>`;
    }
    if (airDevice.error === false) {
      txt = txt + `<p  class='cur-pointer'> 是否异常：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否异常：<span style='color: red'>是</span></p>`;
    }
    const infoWindow = new BMap.InfoWindow(txt, opts);
    marker.V.addEventListener('click', function () {
      baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
    });
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
        // that.addBeiduMap(); // 创建地图

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 进入数据监控页面
  jumpHandle() {
    this.router.navigate([`home/airreport`]);

  }
  // 切换空气指标
  onIndexChange() {
    this.currentAirIndex = this.indexofHtml.name;
    this.map.clearOverlays();
    this.addCertainMarker(this.airdevicelist, this.currentAirIndex); // 添加
    // this.getAirdevices();
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

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }

}
