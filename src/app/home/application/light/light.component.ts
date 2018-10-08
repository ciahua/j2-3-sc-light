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
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  providers: [NgbTimepickerConfig] // add NgbTimepickerConfig to the component providers
})
export class LightComponent implements OnInit, OnDestroy  {

  @ViewChild('map5') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentArea: any; // 当前区域
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
  lightList = []; // 当前数据
  lightListRes = []; // 查询结果
  lightList1 = [];

  markers: any; // 标注点
  strategyList: any; // 控制路灯当前策略
  strategyLists = []; // 策略列表
  time = { hour: 13, minute: 30}; // 路灯控制时间
  contrL = false; // 临时控制
  lightLevel = 0;
  StrategyRuleMess = false; // 提示成功
  LightsContrMess = false; // 提示成功

  // 多设备控制
  showDevicesControl = false; // 多灯控制默认不显示
  showDevicesStrategyCtrl = false; // 多灯分配策略 默认不显示
  strategyList1: any; // 多控路灯策略(统一分配的策略)
  time1 = { hour: 13, minute: 30}; // 路灯控制时间
  lightLevel1 = 0;
  prompt1 = false; // 提示成功
  StrategyRuleMess1 = false; // 提示成功
  LightsContrMess1 = false; // 提示成功
  selectedLightList = []; // 选中的设备

  lightList_check = []; // 当前数据
  allCheck = false;

  queryString: any;


  constructor(private monitorService: MonitorService, private lightService: LightService, public router: Router,
    config: NgbTimepickerConfig ) {
    config.spinners = false; // 时间控制

  }

  ngOnInit() {
    this.addBeiduMap();
    this.getCity(); // 获取城市列表
    this.getStrategy(); // 获取策略表
  }

  // searchStringMe() {
  //   console.log(this.queryString);
  // }

  execQuery() {
    let str_name = '';
    let str_descr = '';
    let str_posi = '';
    const queryString = this.queryString;
    const that = this;

    this.lightListRes = [];
    this.lightList.filter((item, i) => {
      str_name = item.name;
      str_descr = item.description;
      str_posi = item.positionNumber;
      if (str_name.includes(queryString) || str_descr.includes(queryString) || str_posi.includes(queryString)) {
        this.lightListRes.push(item);
      }
    });
  }

  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.closeDevicesControl();
      that.deviceChild = null;
      this.contrL = false;
    });
    baiduMap.addEventListener('dragend', function () {
      that.closeDevicesControl();
    });
    baiduMap.addEventListener('zoomend', function () {
      that.closeDevicesControl();
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
    let compar;
    this.lightService.getLights(NorthEast, SouthWest).subscribe({
      next: function (val) {
        compar = that.comparison(that.lightList, val);
        value = that.judgeChange(compar.a_arr, compar.b_arr);
        // console.log('value');
        // console.log(value);


        that.changeMarker(value); // 替换
        that.deleMarker(compar.a_surplus); // 删除
        // that.deleMarker(value); // 删除
        that.addMarker(compar.b_surplus); // 添加
        // that.addMarker(value); // 添加

        that.lightList = val; // 变为新值
        that.lightListRes = that.comparison1(that.lightList, that.lightListRes);

        that.lightList.map((item, i) => {
          that.lightList_check.push({check: false});
        });
      },
      complete: function () {
        // that.changeMarker(value);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 交并补
  comparison1(a, b) {
    const a_arr: any[] = [];
    let i = 0;
    for (let j = 0; j < b.length; j++) {
      while (i < a.length && a[i].id < b[j].id) {
        i++;
      }
      if (a[i].id === b[j].id) {
        a_arr.push(a[i]);
        i++;
      }
    }
    return a_arr;
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
      a_arr: a_arr, // 共同
      b_arr: b_arr, // 共同
      a_surplus: a_surplus, // a - 删除
      b_surplus: b_surplus, // b - 新增
    };
  }

 // 判断变化值
  judgeChange(a, b) {
    const changePoint: any[] = [];
    const length = a.length < b.length ? a.length : b.length;
    for (let index = 0; index < length; index++) {
      const a_element = a[index];
      const b_element = b[index];
      let a_level = 0;
      let b_level = 0;
      if (a_element.level === 0) {
        a_level = 0;
      } else if (a_element.level < 30 ) {
        a_level = 1;
      } else if (a_element.level < 70) {
        a_level = 2;
      } else {
        a_level = 3;
      }
      if (b_element.level === 0) {
        b_level = 0;
      } else if (b_element.level < 30) {
        b_level = 1;
      } else if (b_element.level < 70) {
        b_level = 2;
      } else {
        b_level = 3;
      }
      if (a_element.error !== b_element.error ||
        a_element.offline !== b_element.offline ||
        a_element.current !== b_element.current ||
        a_element.volt !== b_element.volt ||
        a_element.level !== b_element.level ||
        a_level !== b_level
       ) {
        changePoint.push(b_element);
      }

    }
    return changePoint;

  }

  // 替换
  changeMarker(light_list) {
    this.deleMarker(light_list); // 删除
    this.addMarker(light_list); // 添加
  }
  // 删除
  deleMarker(light_list) {
    const makers = this.map.getOverlays();
    for (let ind = 0; ind < light_list.length; ind++) {
      const ele = light_list[ind];
      const point = light_list[ind].point;
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

      this.markers = markers;
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
      width: 300,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
    };
    let txt = `
    <p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'>${val.description} </p>

    `;
    txt = txt +
      `<p>灯杆编号： ${val.positionNumber}</p>
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
    if (val.rule && val.rule.name) {
      txt = txt + `<p >应用策略： ${val.rule.name}</p>`;
    } else {
      txt = txt + `<p >应用策略：无</p>`;
    }
    txt = txt + `<p >亮度级别： ${val.level}%</p>`;
    txt = txt + `<p >电流强度： ${val.current}毫安(mA)</p>`;
    txt = txt + `<p >电压大小： ${val.volt}毫伏(mv)</p>`;
    txt = txt + `<button class='btn btn-outline-info cur-point' style='font-size: 14px; float: right; margin: 5px;'
      id='${val.id}'>控制</button>`;


    const infoWindow = new BMap.InfoWindow(txt, opts);

    marker.addEventListener('click', function () {
      that.closeDevicesControl();
      that.device = val;
      baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口
      setTimeout(() => {
        that.deviceAddEventListener();
      }, 0);
    });

  }

  // 点击控制按钮
  deviceAddEventListener() {
    const that = this;

      const device = $(`#${this.device.id}`);
      device.on('click', function () {
        that.contrL = false;
        that.StrategyRuleMess = false;
        that.LightsContrMess = false;
        that.deviceChild = that.device;
        that.lightLevel = that.device.level;

        if (that.device.ruleId) {
          that.strategyLists.map((item, index) => {
            if (item.id === that.device.ruleId) {
              that.strategyList = that.strategyLists[index];
            }
          });
        }


      });

  }

  // 多选框 - 单选：选择需要统一分配策略的路灯
  addLightstoCtrl() {
    this.selectedLightList = [];
    this.lightList_check.map((item, i) => {
      if (item.check === true) {
        const item1 = this.lightList[i];
        if (item1) {
          this.selectedLightList.push(item1);
        }
      }
    });
    // console.log(this.selectedLightList);
  }
  // 多选框 - 全选
  allCheckMe() {
    if (this.allCheck) {
      this.selectedLightList = [];
      this.lightList_check.map((item, i) => {
        this.lightList_check[i].check = true;
        const item1 = this.lightList[i];

        if (item1) {
          this.selectedLightList.push(item1);
        }


      });
    }
    // console.log(this.selectedLightList);
  }

  addArr(arr) {}

  // 点击关闭操作详情
  closeDetail() {
    this.deviceChild = null;
    this.contrL = false;
  }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const zoom = this.zoom = this.switchZone(city.level);
    console.log(city);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);


  }

  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
  }

  // 打开多灯控制
  devicesControl() {
    this.queryString = '';
    this.StrategyRuleMess1 = false;
    this.LightsContrMess1 = false;
    this.showDevicesControl = true;
    this.lightListRes = [].concat(this.lightList);
    // console.log(this.lightListRes);
  }

  // 关闭多灯控制
  closeDevicesControl() {
    this.showDevicesControl = false;
    this.showDevicesStrategyCtrl = false;
    this.selectedLightList = [];
    this.allCheck = false;
    this.lightList_check.map((item , i) => {
      this.lightList_check[i].check = false;
    });
    this.strategyList1 = null;
  }
  // 多灯策略分配
  devicesStrategyCtrl() {
    if (this.selectedLightList.length > 0) {
      this.showDevicesStrategyCtrl = true;
    } else {
      alert('请选择设备');
    }

  }
  // 关闭多灯策略分配框体
  closeDevicesStrategyCtrl() {
    this.showDevicesStrategyCtrl = false;
  }
  // 获取数据

  // 获取城市列表 --ok
  getCity() {
    const that = this;

    this.monitorService.getZoneDefault().subscribe({
      next: function (val) {
        that.cityList = val.regions;
        that.zoom = that.switchZone(val.zone.level);
        that.node = that.getNode(val.regions, val.zone.region_id);
        that.currentCity = that.node ;
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
    this.currentArea = block;
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

  // 路灯控制页选择策略
  strategyListsChange() {
    this.StrategyRuleMess = false;
    this.LightsContrMess = false;
    this.prompt1 = false;
    console.log('策略改变');
  }
  // 路灯控制页选择策略
  strategyListsChange1() {
    this.StrategyRuleMess1 = false;
    this.LightsContrMess1 = false;
    this.prompt1 = false;
    console.log('策略改变');
  }

  // 临时控制切换
  // changeContr() {
  //   this.contrL = !this.contrL;
  //   this.prompt = false;
  // }

  // 时间改变
  changeTime() {
    this.StrategyRuleMess = false;
    this.LightsContrMess = false;
    console.log('时间改变');
  }
  changeTime1() {
    this.StrategyRuleMess1 = false;
    this.LightsContrMess1 = false;
    console.log('时间改变');
  }
  // 亮度改变
  changeSlider() {
    this.StrategyRuleMess = false;
    this.LightsContrMess = false;
    console.log('亮度改变');
  }

  // 路灯控制页亮度调节
  formatLabel(value: number | null) {
    // this.prompt = false;
    if (!value) {
      return 0;
    }

    if (value > 100) {
      return Math.round(value / 100) + '%';
    }
    this.lightLevel = value;

    return value + '%';
  }



  // 控制路灯
  lightsContr(id) {

    this.setLightsContr(id);
  }
  // 下发策略
  lightsRuleContr(id) {
    this.setStrategyRule(id);
  }

   // 路灯- 临时控制-接口
  setLightsContr(id) {
    const that = this;
    const strategyList = this.strategyList;
    const stopTime = this.time;
    const level = this.lightLevel;
    this.lightService.setLightsContr(id, level, stopTime).subscribe({
      next: function (val) {
        that.LightsContrMess = true;
        console.log('ok!');
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 多控路灯- 临时控制(亮度)-接口
  setLightsContr1() {
    const that = this;
    const ids = [];
    const stopTime = this.time1;
    const level = this.lightLevel1;
    this.selectedLightList.map((item, i) => {
      ids[i] = item.id;
    });
    this.lightService.setLightsLevel(ids, level, stopTime).subscribe({
      next: function (val) {
        that.LightsContrMess1 = true;
        console.log('ok!');
      },
      complete: function () {},
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 控制路灯-下发策略-接口
  setStrategyRule(id) {
    const that = this;
    const strategyList = this.strategyList;

    this.lightService.setStrategyRule(id, strategyList.id).subscribe({
      next: function (val) {
        that.StrategyRuleMess = true;
        console.log('ok!');
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 多控路灯-集体下发策略
  setStrategyRules() {
    const that = this;
    const strategyList1 = that.strategyList1;
    const ids = [];
    if (strategyList1) {
      const ruleId = this.strategyList1.id;
      this.selectedLightList.map((item, i) => {
        ids[i] = item.id;
      });
      this.lightService.setLightsRule(ids, ruleId).subscribe({
        next: function (val) {
          that.StrategyRuleMess1 = true;
          console.log('ok!');
        },
        complete: function () {},
        error: function (error) {
          console.log(error);
        }
      });
    } else {
      alert('请选择策略!');
    }

  }

  // 获取策略表
  getStrategy() {
    const that = this;
    this.lightService.getStrategy().subscribe({
      next: function (val) {
        that.strategyLists = val;
        that.strategyList = that.strategyLists[0];
        // console.log(val);
      },
      complete: function () {
        // that.changeMarker(value);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
