/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: cover.componen.ts
@time: 2018 /8 / 9 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Point } from '../../../data/point.type';
import { LIGHTLIST } from '../../../data/light-list';
import { MonitorService } from '../../../service/monitor.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// ymZhao
import { MessageService } from '../../../service/message.service';
import { MessService } from '../../../service/mess.service';
import { CommunicateService } from '../../../service/communicate.service';
import { GradOverlar } from '../../../service/grad.overlay';
import { CoverService } from '../../../service/cover.service';
// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_TOP_LEFT;
declare let echarts; // ymZhao

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit, OnDestroy {
  messageList: any;
  messageList1: any;
  messageList2: any; // 井盖三按状态生成的列表
  @ViewChild('map3') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象
  coverList = [];  // 当前井盖列表

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
  showunstartedlist = false; // 默认不显示“未处理”的异常消息
  showonprogresslist = false; // 默认不显示“处理中”的异常消息
  showfinishedlist = false; // 默认不显示“已处理”的异常消息
  timer: any; // 定时器
  constructor(private coverService: CoverService, private monitorService: MonitorService,
    private messageService: MessageService, public messService: MessService, private config: NgbDropdownConfig) {
      // config.placement = 'top-left';
      // config.placement = 'bottom-left';
     }

  ngOnInit() {
    this.addBeiduMap();
    this.getCity(); // 获取城市列表
    this.getMessage();  // 获取井盖异常消息列表
  }

  // ymZhao 获取井盖异常消息列表
  getMessage() {
    const that = this;
    this.messageService.getMessage().subscribe({
      next: function (val) {
        that.messageList = val.list;
      },
      error: function (error) {
        console.log(error);
      }
    });
    this.messageService.getMessage1().subscribe({
      next: function (val) {
        that.messageList1 = val.list;
      },
      error: function (error) {
        console.log(error);
      }
    });
    this.messageService.getMessage2().subscribe({
      next: function (val) {
        that.messageList2 = val.list;
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
      // minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例

    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）

    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别

    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    // map.setMapStyle({ style: 'grayscale' });
    map.setMapStyle({ style: 'normal' });  // dark

    // 添加控件缩放
    const offset = new BMap.Size(20, 55);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);

    this.addMarker();
  }
    // 返回地图可视区域，以地理坐标表示
    getBounds(baiduMap) {
      const Bounds = baiduMap.getBounds(); // 返回地图可视区域，以地理坐标表示
      this.NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
      this.SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角
      this.zoom = baiduMap.getZoom(); // 地图级别
    }

  addMarker() {
    this.getCovers();  // 获取井盖
    this.timer = setInterval(() => {
      // this.map.clearOverlays();
      this.getCovers();
    }, 5000);


  }

  // 获取地图内井盖
  getCovers() {

    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest(); // 返回矩形区域的西南角

    let compar;
    let value;
    this.coverService.getCovers(NorthEast, SouthWest).subscribe({
      next: function (val) {
        // value = val;
        compar = that.comparison(that.coverList, val);
        value = that.judgeChange(compar.a_arr, compar.b_arr);

        that.changeMarker(value); // 替换
        that.deleMarker(compar.a_surplus); // 删除
        // that.deleMarker(value); // 删除
        that.addPoint(compar.b_surplus); // 添加
        // that.addPoint(value); // 添加

        that.coverList = val; // 变为新值
      },
      complete: function () {
        // that.addPoint(value);
      },
      error: function (error) {
        console.log(error);
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
  judgeChange(a, b) {
    const changePoint: any[] = [];
    const length = a.length < b.length ? a.length : b.length;
    for (let index = 0; index < length; index++) {
      const a_element = a[index];
      const b_element = b[index];
      if (a_element.error !== b_element.error ||
        a_element.offline !== b_element.offline ||
        a_element.alarm !== b_element.alarm ||
        a_element.lowBattery !== b_element.lowBattery
       ) {
        changePoint.push(b_element);
      }

    }
    return changePoint;

  }

  // 替换
  changeMarker(cover_list) {
    // console.log(cover_list);
    // console.log(this.coverList);
    this.deleMarker(cover_list); // 删除
    this.addPoint(cover_list); // 添加
  }
  // 删除
  deleMarker(cover_list) {
    const makers = this.map.getOverlays();
    for (let ind = 0; ind < cover_list.length; ind++) {
      const ele = cover_list[ind];
      const point = cover_list[ind].point;
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

      if (item.alarm && item.alarm === true) { // 异常
        myIcon = new BMap.Icon('../../../../assets/imgs/cover-lose.png', new BMap.Size(36, 36));
      } else if (item.offline === true) { // 掉线
        myIcon = new BMap.Icon('../../../../assets/imgs/cover-offline.png', new BMap.Size(36, 36));

      } else if (item.lowBattery === true) {
        myIcon = new BMap.Icon('../../../../assets/imgs/cover-lowpower.png', new BMap.Size(36, 36));
      } else { // 正常
        myIcon = new BMap.Icon('../../../../assets/imgs/cover-normal.png', new BMap.Size(36, 36));
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


  // 标注消息列表中点击的井盖事件
  findPoint(mess) {
    const pt = new BMap.Point(mess.lng, mess.lat);
    const messtype = mess.handleType;
    let myIcon;
    if (messtype === 0) {
      myIcon = new BMap.Icon('../../../../assets/imgs/cover-lose.png', new BMap.Size(16, 16));
    } else if (messtype === 1) {
      myIcon = new BMap.Icon('../../../../assets/imgs/cover-offline.png', new BMap.Size(16, 16));
    } else if (messtype === 2) {
      myIcon = new BMap.Icon('../../../../assets/imgs/cover-normal.png', new BMap.Size(16, 16));
    } else {
      console.log('Error messtype!');
    }

    const marker = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    this.map.addOverlay(marker);
    this.map.centerAndZoom(pt, 18);
    this.openSideBar(marker, this.map, mess, pt);
    setTimeout(() => {
      marker.V.click();
    }, 50);
  }

  // 地图点注标-点击事件
  openSideBar(marker, baiduMap, mess, point) {
    const that = this;
    const opts = {
      width: 350,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
      // border-radius: 5px,
    };
    let txt = `<p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc;'>设备编号 | ${mess.positionNumber} </p>`;

    txt = txt + `<p  class='cur-pointer'> 设备名称：${mess.description}</p>`;
    if (mess.lowBattery === false) {
      txt = txt + `<p  class='cur-pointer'> 是否低电量：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否低电量：<span style='color: red'>是</span></p>`;
    }
    if (mess.alarm === false) {
      txt = txt + `<p  class='cur-pointer'> 是否报警：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否报警：<span style='color: red'>是</span></p>`;
    }
    if (mess.error === false) {
      txt = txt + `<p  class='cur-pointer'> 是否故障：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否故障：<span style='color: red'>是</span></p>`;
    }
    if (mess.offline === false) {
      txt = txt + `<p  class='cur-pointer'> 是否离线：否</p>`;
    } else {
      txt = txt + `<p  class='cur-pointer'> 是否离线：<span style='color: red'>是</span></p>`;
    }
    if (mess.lowBattery || mess.alarm || mess.error || mess.offline) {
      txt = txt + `<button class='btn btn-outline-info cur-point' style='font-size: 14px; float: right; margin: 5px'>处理</button>`;
    }


    const infoWindow = new BMap.InfoWindow(txt, opts);

    marker.addEventListener('click', function () {
      that.device = mess;
      baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
      // setTimeout(() => {
      //   that.deviceAddEventListener();
      // }, 0);
    });

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

  // 获取对应处理状态的消息
  readHandleType(mess, messtype) {
    const handletype = mess.handleType;
    if (messtype === handletype) {
      return true;
    } else {
      return false;
    }
  }

  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.currentCity = city;
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

  // 消息相关
  // 显示 未处理 消息
  showUntartedList() {
    this.showunstartedlist = true;
  }
  // 显示 处理中 消息
  showOnprogressList() {
    this.showonprogresslist = true;
  }
  // 显示 已处理消息
  showFinishedList() {
    this.showfinishedlist = true;
  }
  // 离开 未处理
  messageListMouseleave_1() {
    this.showunstartedlist = false;
  }
  // 离开 处理中
  messageListMouseleave_2() {
    this.showonprogresslist = false;
  }
  // 离开 已处理
  messageListMouseleave_3() {
    this.showfinishedlist = false;
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
