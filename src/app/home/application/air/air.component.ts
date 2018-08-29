import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorService } from '../../../service/monitor.service';
import { AirmonitorService } from '../../../service/airmonitor.service';
// import { AIRDATALIST } from '../../../data/air-data';
import { Point } from '../../../data/point.type';

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
export class AirComponent implements OnInit {

  @ViewChild('map6') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentChildren: any; // 当前城市节点
  currentBlock: any; // // 当前城市街道

  visible = true; // 控制可视区域
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  zoom: any; // 地图级数

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  SouthWest: Point; // 地图视图西南角
  NorthEast: Point; // 地图视图东北角
  // pm25list = AIRDATALIST.list;

  constructor(private monitorService: MonitorService, private airmonitorService: AirmonitorService,
    public router: Router) { }
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

    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    // const marker = new BMap.Marker(point);  // 创建标注
    // map.addOverlay(marker);               // 将标注添加到地图中
    this.addMarkers();
  }

  addMarkers() {
    this.getPositions();
  }
  getPositions() {
    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角

    let value;
    this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
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

  addPoint(val) {
    const markers: any[] = [];
    const points: any[] = [];
    const that = this;
    val.map((item, i) => {
      const point = new BMap.Point(item.point.lng, item.point.lat);
      // const name = item.name;
      // 添加自定义覆盖物
      let myIcon;

      if (item.pm25 >= 0 && item.pm25 <= 50) {
        myIcon = new BMap.Icon('../../../../assets/imgs/pm25Icon.png', new BMap.Size(300, 157));
      } else if (item.pm25 > 50 && item.pm25 <= 100) {
        myIcon = new BMap.Icon('../../../../assets/imgs/pm25Icon.png', new BMap.Size(300, 157));
      } else if (item.pm25 > 100 && item.pm25 <= 150) {
        myIcon = new BMap.Icon('../../../../assets/imgs/pm25Icon.png', new BMap.Size(300, 157));
      } else if (item.pm25 > 150 && item.pm25 <= 200) {
        myIcon = new BMap.Icon('../../../../assets/imgs/pm25Icon.png', new BMap.Size(300, 157));
      } else if (item.pm25 > 200) {
        myIcon = new BMap.Icon('../../../../assets/imgs/pm25Icon.png', new BMap.Size(300, 157));
      }
      myIcon.setAnchor(new BMap.Size(16, 38));
      const marker = new BMap.Marker(point, { icon: myIcon });  // 创建标注
      this.map.addOverlay(marker);
      markers.push(marker); // 聚合
      points.push(point); // 聚合
    });
    // 点击点标注事件
    // for (let index = 0; index < that.markers.length; index++) {
    //   const marker = that.markers[index];
    //   that.openSideBar(marker, that.map, val[index], points[index]);
    // }
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
        // that.addBeiduMap(); // 创建地图

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
  // 地图描点
  addMarker() {
    const markers: any[] = [];
    const points: any[] = [];
  }

  jumpHandle() {
    this.router.navigate([`home/airreport`]);
  }
}
