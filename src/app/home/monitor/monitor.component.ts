import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BeiduAPIService } from '../../servers/baiduApi';
import { BeiduMAPService } from '../../servers/baiduMap';
import { DEVICEMAP } from '../../data/device-map';
import { CircleOverlarService } from './circle-overlay.server';
import { REGIONLIST } from '../../data/region-list';
import { BLOCKLIST } from '../../data/block-list';
import { COMMUNITYLIST } from '../../data/community-list';
import { Point } from '../../data/point.type';
import { MonitorService } from '../../service/monitor.server';
// baidu map
declare let BMap;
declare let BMapLib;
declare let BMAP_STATUS_SUCCESS;
declare let BMAP_ANCHOR_TOP_LEFT;
declare let BMAP_ANCHOR_BOTTOM_RIGHT;

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  @ViewChild('map3') map_container: ElementRef;
  map: any; // 地图对象
  marker: any; // 标记
  deviceMap = DEVICEMAP;
  zoom: any; // 地图级数
  SouthWest: Point;
  NorthEast: Point;

  constructor(private beiduAPIService: BeiduAPIService, private beiduMAPService: BeiduMAPService,
    private monitorService: MonitorService
    ) {
    this.zoom = 12; // 默认

  }


  ngOnInit() {
    this.addBeiduMap(); // 创建地图
    this.addMarker(); // 添加标注

  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom : 11,
      // maxZoom : 11
    }); // 创建地图实例

    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, this.zoom); // 设置中心和地图显示级别


    // 地图类型控件
    map.addControl(new BMap.MapTypeControl());
    // map.setCurrentCity("广州");


    // 添加控件缩放
    map.addControl(new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: new BMap.Size(20, 85),
    }));

    const top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(50, 85)}); // 左上角，添加比例尺
    map.addControl(top_left_control);

    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom(true); // 连续缩放效果，默认禁用

    this.getBounds(map);
    this.dragendOff(map);
    this.zoomendOff(map);


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
    baiduMap.addEventListener('zoomend', function () {
      that.zoom = baiduMap.getZoom();
      that.remove_overlay(baiduMap);
      that.addMarker(); // 添加标注
      console.log('地图缩放至：' + baiduMap.getZoom() + '级');
    });
  }

  // 获取数据
  getRegion(sw: Point, ne: Point, zoom: Number,  length, color, mouseoverColor) {
    const that = this;
    let value;
    this.monitorService.getRegion(sw, ne, zoom).subscribe({
      next: function (val) {
        value = val;
        console.log(value);
      },
      complete: function () {
        console.log(value);
        that.addCirCle(value, length, color, mouseoverColor);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

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

  // 清除覆盖物
  remove_overlay(baiduMap) {
    baiduMap.clearOverlays();
  }

  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角

  }

  // 锚点
  addMarker() {
    const that = this;

    const zoom = this.zoom;
    const sw = this.SouthWest;
    const ne = this.NorthEast;
    let val, length, color, mouseoverColor;
    switch (zoom) {
      case 11:
      case 12:
      case 13:
        val = REGIONLIST.val.region_list;
        length = 90;
        color = '#007bff';
        mouseoverColor = '#f60';
        that.getRegion(sw, ne, zoom, length, color, mouseoverColor);
        break;
      case 14:
      case 15:
      case 16:
        val = BLOCKLIST.val.block_list;
        length = 70;
        color = '#62ab00';
        mouseoverColor = '#f60';
        that.getBlock(sw, ne, zoom, length, color, mouseoverColor);
        break;
      case 17:
      case 18:
      case 19:
      case 20:
        val = COMMUNITYLIST.val.community_list;
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
    const markers: any[] = [];
    val.map((item, i) => {
      const pt = new BMap.Point(item.lng, item.lat);
      const name = item.name;
      const mk = new BMap.Marker(pt); // 默认标注
      this.map.addOverlay(mk);
      markers.push(mk); // 聚合

    });

    // 点击点标注事件

    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
      this.openSideBar(marker, this.map, val[index]);
    }
  }

  // 添加圆形标注
  addCirCle(val, length, color, mouseoverColor) {
    const markers: any[] = [];
    val.map((item, i) => {

      const pt = new BMap.Point(item.lng, item.lat);
      const name = item.name;

      // const myIcon = this.makeIcon(item.type);
      // const marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注-图片icon
      // this.map.addOverlay(marker2);              // 将标注添加到地图中

      // 添加自定义覆盖物
      const mySquare = new CircleOverlarService(pt, name, length, color, mouseoverColor);
      this.map.addOverlay(mySquare);

      markers.push(mySquare); // 聚合


    });

    // 点击圆形标注事件

    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
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
  openSideBar(marker, baiduMap, val) {
    const that = this;
    const txt = `<p style=’font-size:12px;lineheight:1.8em;’>${val.name}</p>`;
    const infoWindow = new BMap.InfoWindow(txt);
    marker.addEventListener('click', function () {
      this.openInfoWindow(infoWindow);
    });
  }

// 创建标注
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




}
