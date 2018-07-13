import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BeiduAPIService } from '../../servers/baiduApi';
import { BeiduMAPService } from '../../servers/baiduMap';
import { DEVICEMAP } from '../../data/device-map';
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

  constructor(private beiduAPIService: BeiduAPIService, private beiduMAPService: BeiduMAPService) {

  }


  ngOnInit() {
    this.addBeiduMap(); // 创建地图
    this.addMarker(); // 添加标注

  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true }); // 创建地图实例

    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别



    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 12); // 设置中心和地图显示级别



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

    // 缩略图
    const overViewOpen = new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT });
    map.addControl(overViewOpen);

    //  城市列表控件
    const size = new BMap.Size(150, 85);
    map.addControl(new BMap.CityListControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: size,
    // 切换城市之间事件
    // onChangeBefore: function(){
    //    alert('before');
    // },
    // 切换城市之后事件
    // onChangeAfter:function(){
   // }
    }));


    map.enableScrollWheelZoom(true); // 启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom(true); // 连续缩放效果，默认禁用

    this.getBounds(map);
    this.dragendOff(map);
    this.zoomendOff(map);





  }

  // 拖动地图事件-显示用户拖动地图后地图中心的经纬度信息。
  dragendOff(baiduMap ) {
    baiduMap.addEventListener('dragend', function () {
      const center = baiduMap.getCenter();
      console.log('地图中心点变更为：' + center.lng + ', ' + center.lat);
    });
  }
  // 地图缩放事件-地图缩放后的级别。
  zoomendOff(baiduMap) {
    baiduMap.addEventListener('zoomend', function () {
      console.log('地图缩放至：' + baiduMap.getZoom() + '级');
    });
  }

  // 返回地图可视区域，以地理坐标表示
  getBounds(baiduMap) {
    const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
    console.log('返回地图可视区域，以地理坐标表示'); // 返回地图可视区域，以地理坐标表示
    console.log(Bounds); // 返回地图可视区域，以地理坐标表示
    console.log('返回矩形的中心点'); // 返回矩形的中心点
    console.log(Bounds.getCenter()); // 返回矩形的中心点
    console.log('返回矩形区域的西南角'); // 返回矩形区域的西南角
    console.log(Bounds.getSouthWest()); // 返回矩形区域的西南角
    console.log('返回矩形区域的东北角'); // 返回矩形区域的东北角
    console.log(Bounds.getNorthEast()); // 返回矩形区域的东北角
    console.log('返回矩形区域的跨度'); // 返回矩形区域的跨度
    console.log(Bounds.toSpan()); // 返回矩形区域的跨度
  }

  // 锚点
  addMarker() {
    const that = this;
    const markers: any[] = [];

    this.deviceMap.map((item, i) => {
      const pt = new BMap.Point(item.point[0], item.point[1]);
      // console.log(pt);
      const mk = new BMap.Marker(pt);
      this.map.addOverlay(mk);

      // const myIcon = this.makeIcon(item.type);
      // const marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
      // this.map.addOverlay(marker2);              // 将标注添加到地图中

      markers.push(mk);


    });

    // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。MarkerClusterer
    // console.log(2);
    // console.log(markers);

    const markerClusterer = new BMapLib.MarkerClusterer(this.map, { markers: markers });
    markerClusterer.clearMarkers();
    markerClusterer.addMarkers(markers);

    // 点击事件

    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
      this.addInfo(marker, this.deviceMap[index]);
    }


  }

// 点击事件
  addInfo(marker, device) {
    const txt = `<p style=’font-size:12px;lineheight:1.8em;’>${device.name}</p>`;
    const infoWindow = new BMap.InfoWindow(txt);
    marker.addEventListener('click', function () { this.openInfoWindow(infoWindow); });
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
    console.log(marker);
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
