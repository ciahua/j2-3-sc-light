/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: calamity.component.ts
@time: 2018 /8 / 9 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'; // 要求实现方法
import { MonitorService } from '../../../service/monitor.service';
import { VideoService } from '../../../service/video.service';
import { Router } from '@angular/router';
import { CircleOverlarAirService } from '../../../service/circle-overlay-air.service';
// baidu map
declare let BMap;
declare let BMAP_ANCHOR_TOP_LEFT; // 控件定位于地图的左上角

// 装饰器函数
@Component({
  selector: 'app-calamity',
  templateUrl: './calamity.component.html',
  styleUrls: ['./calamity.component.scss']
})
export class CalamityComponent implements OnInit, OnDestroy {

  @ViewChild('map5') map_container: ElementRef;
  /*
  model:object
  light_list: array // 灾害数据

  @deviceType: number// 井盖类型id
  @messageList: array //  待处理消息
  @messageList1: array // 处理中消息
  @messageList2: array // 已处理消息
  */
  model: any = {}; // 存储数据

  /*
  map_model: object // 城市列表相关
  @currentCity: any // 当前城市
  @currentArea: any // 当前区域
  @cityList: array // 城市列表
  @currentChildren: array // 区域列表一级
  @currentBlock: array // 当前城市街道 = []; // 区域列表2级
  */

  map_model: any = {}; // 存储数据

  map: any; // 地图对象
  zone: any; // 安装区域
  timer: any; // 定时器

  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  deviceshow = false; // 默认设备列表不显示

  visible = true; // 控制可视区域

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  showunstartedlist = false; // 默认不显示“未处理”的异常消息
  showonprogresslist = false; // 默认不显示“处理中”的异常消息
  showfinishedlist = false; // 默认不显示“已处理”的异常消息

  deviceTypeId = 8; // 灾害预警

  constructor(private monitorService: MonitorService, private videoService: VideoService,
    public router: Router) {
    this.model.deviceType = 8; // 灾害
    this.model.messageList = []; // 待处理
    this.model.messageList1 = []; // 处理中
    this.model.messageList2 = []; // 已处理
    this.model.coverList = [];

    this.model.light_list = []; // 当前灾害列表
    this.map_model.cityList = []; // 城市列表
    this.map_model.currentChildren = []; // 区域列表一级
    this.map_model.currentBlock = []; // // 当前城市街道 = []; // 区域列表2级
   }

  // 放置初始化逻辑
  ngOnInit() {
    this.addBeiduMap(); // 百度地图API功能
    this.getCity(); // 获取城市列表
    this.getUserList(); // 获取用户列表
  }
   // 用户列表
   getUserList() {
    const that = this;
    this.videoService.getAllUser().subscribe({
      next: function(val) {
        that.model.userList = val;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }

  // 获取井盖异常消息列表
  getMessage() {
    const that = this;
    const deviceType = this.model.deviceType;
    // 待处理
    this.videoService.getIssues(deviceType, 0).subscribe({
      next: function (val) {
        // console.log("deviceType",deviceType);
        // console.log("0val",val);
        that.model.messageList = val;

      },
      error: function (error) {
        console.log(error);
      }
    });
    // 处理中
    this.videoService.getIssues(deviceType, 1).subscribe({
      next: function (val) {
        // console.log("deviceType",deviceType);
        // console.log("1val",val);
        that.model.messageList1 = val;
      },
      error: function (error) {
        console.log(error);
      }
    });
    // 已处理
    this.videoService.getIssues(deviceType, 2).subscribe({
      next: function (val) {
        // console.log("deviceType",deviceType);
        // console.log("2val",val);
        that.model.messageList2 = val;
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

    const point = new BMap.Point(113.924755, 22.49934); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 16); // 设置中心和地图显示级别

    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    // 地图类型控件
    map.addControl(new BMap.MapTypeControl());

    map.setMapStyle({ style: 'normal' });   // dark


    // 添加控件缩放

    const offset = new BMap.Size(20, 55);
    // 平移缩放控件
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);


    this.getLights(); // 获取地图上的点
    this.getMessage(); // 获取井盖异常消息列表
    this.timer = setInterval(() => {
      this.getLights(); // 获取地图上的点
      this.getMessage(); // 获取灾害异常消息列表
    }, 10000 * 60);

    this.dragendOff(map);
    this.zoomendOff(map);

  }

    // 监控- -显示用户拖动地图后地图中心的经纬度信息。
    dragendOff(baiduMap) {
      const that = this;
      baiduMap.addEventListener('dragend', function () {
        baiduMap.clearOverlays();
        that.getLights();  // 获取灾害
        console.log('开始拖动');
      });
    }
    // 监控-地图缩放事件-地图缩放后的级别。
    zoomendOff(baiduMap) {
      const that = this;
      baiduMap.addEventListener('zoomend', function () {
          // baiduMap.clearOverlays();
          that.getLights();  // 获取灾害
          console.log('地图缩放至：' + baiduMap.getZoom() + '级');
      });
    }

  // 获取地图上的灾害设备点
  getLights() {
    const that = this;
    const Bounds = this.map.getBounds(); // 返回地图可视区域，以地理坐标表示
    const NorthEast = Bounds.getNorthEast(); // 返回矩形区域的东北角
    const SouthWest = Bounds.getSouthWest();

    let compar;
    let value;
    this.videoService.getCalamity(NorthEast, SouthWest).subscribe({
      next: function (val) {
        compar = that.comparison(that.model.coverList, val);
        value = that.judgeChange(compar.a_arr, compar.b_arr);

        that.changeMarker(value); // 替换
        that.deleMarker(compar.a_surplus); // 删除
        that.addMarker(compar.b_surplus); // 添加
        that.model.light_list = val; // 变为新值

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
    if (b.length === 0) {
      for (let k = 0; k < a.length; k++) {
        a_surplus.push(a[k]);
      }
    }
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
      while (i < a.length && j === b.length - 1) {
        a_surplus.push(a[i]);
        i++;
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
  changeMarker(light_list) {
    this.deleMarker(light_list); // 删除
    this.addMarker(light_list); //  添加
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
        if (point[1] === lat && point[0] === lng) {
          this.map.removeOverlay(makers[index]);
        }
      }
    }
  }

  // 添加点标注
  addMarker(light_list) {
    const markers: any[] = [];
    const points: any[] = [];
    const that = this;

    for (let index = 0; index < light_list.length; index++) {
      const item = light_list[index]; // 点消息
      const point = new BMap.Point(item.point.lng, item.point.lat); // 坐标

      let myIcon;
      let marker2;
      if (item.alarm === 1) {
        switch (item.deviceModelId) {
          case 32:
          myIcon = new BMap.Icon('../../../../assets/imgs/building.gif', new BMap.Size(64, 64));
          break;
          case 33:
          myIcon = new BMap.Icon('../../../../assets/imgs/landslide.gif', new BMap.Size(64, 64));
          break;
          case 34:
          myIcon = new BMap.Icon('../../../../assets/imgs/odor.gif', new BMap.Size(64, 64));
          break;
          case 35:
          myIcon = new BMap.Icon('../../../../assets/imgs/gas.gif', new BMap.Size(64, 64));
          break;
          case 36:
          myIcon = new BMap.Icon('../../../../assets/imgs/hydrops.gif', new BMap.Size(64, 64));
          break;
        }
        myIcon.setAnchor(new BMap.Size(27, 26));


      }
      // else {
      //   myIcon = new BMap.Icon('../../../../assets/imgs/zh-normal.png', new BMap.Size(48, 48));
      //   myIcon.setAnchor(new BMap.Size(48, 48));
      //   marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
      // }
      marker2 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
      that.map.addOverlay(marker2);
      markers.push(marker2); // 聚合
      points.push(point); // 聚合

    }
    // 点击点标注事件
    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
      this.videoService.getDeviceIssues(light_list[index].id, 0).subscribe({
        next: function (res1) {
          that.videoService.getDeviceIssues(light_list[index].id, 1).subscribe({
            next: function (res2) {
              that.openSideBar(marker, that.map, light_list[index], points[index], res1, res2);
            },
            error: function (error) {
              console.log(error);
            }
          });
          // that.openSideBar(marker, that.map, val[index], points[index], res);
        },
        error: function (error) {
          console.log(error);
        }
      });

    }
  }

  // 标注消息列表中点击的灾害事件（点击靠近那个点）
  findPoint(item) {
    // console.log('item', item);
    let marker;
    const that = this;
    const makers = this.map.getOverlays();
    const point = new BMap.Point(item.point.lng, item.point.lat);
    // 新添加
    that.map.centerAndZoom(point, 16);
    that.getLights();  // 获取灾害

    this.model.issueId = item.id;
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

    //  this.map.centerAndZoom(point, 16);

  }

  // 地图点注标-点击事件
  openSideBar(marker, baiduMap, mess, point, res1, res2) {
    // const res = this.getDeviceIssues(mess.id);
    /*
    res1: 待处理
    res2: 处理中
    */
    const that = this;
    const opts = {
      width: 350,     // 信息窗口宽度
      // height: 100,     // 信息窗口高度
      // title: `${val.name} | ${val.id }`, // 信息窗口标题
      // enableMessage: true, // 设置允许信息窗发送短息
      enableAutoPan: true, // 自动平移
      // border-radius: 5px,
    };
    // console.log("mess-start",mess);
    // this.model.deviceId = mess.id;
    let txt = `<p style='font-size: 12px; line-height: 1.8em; border-bottom: 1px solid #ccc; padding-bottom: 10px;'>`;

    txt = txt + `灾害编号 | ${mess.name} | ${mess.id}</p><p> 灾害名称：${mess.description}</p>`;
    if (mess.alarm === 0) {
      txt = txt + `<p> <span style='color: blue'>警报：正常</span></p>`;
    } else {
      txt = txt + `<p> <span style='color: red'>警报：${mess.alarm}级</span></p>`;
    }
    if (mess.error === false) {
      txt = txt + `<p> 是否危险：否</p>`;
    } else {
      txt = txt + `<p> 是否危险：<span style='color: red'></span></p>`;
    }
    if (mess.offline === false) {
      txt = txt + `<p> <span style='color: red'>离线</span></p>`;
    } else {
      txt = txt + `<p> <span style='color: blue'>在线</span></p>`;
    }
    // if (mess.lowBattery || mess.alarm || mess.error || mess.offline) {

    if (res1 && res1.length > 0) {
      txt = txt + `<hr>&nbsp;<span style='color: red;'>待处理事件：</span>`;
      for (let index = 0; index < res1.length; index++) {
        const element = res1[index];
        txt = txt + `<span style='color: red;'>${element.typeName}</span>`;
      }
      const m = `massage-lsq${mess.id}`;
      const p = `massage-post${mess.id}`;
      const selId = `select${mess.id}`;
      txt = txt + `
      <div class="form-inline">
        <label class="control-label" style='font-size: 14px;'>
          指派人员：<span style="color: red;">*</span>
        </label>
        <select name="assignUser" class="cur-pointer form-control" style='font-size: 14px; margin: 5px'
          id="${selId}"></select></div>`; // onchange="${that.model.curUser}=options[selectedIndex].value"
      txt = txt + `<label>处理信息：</label><textarea id=${m}  rows="3"  style='width:100%;'></textarea>`;
      txt = txt + `<p><button id=${p} class='btn btn-outline-info cur-point' style='font-size: 14px; float: right; margin: 5px'>
      处理</button></p>`;


    }
    if (res2 && res2.length > 0) {
      txt = txt + `<hr><span style='color: #ffb822;'>处理中事件：</span>`;
      for (let index = 0; index < res2.length; index++) {
        const element = res2[index];
        txt = txt + `&nbsp;<span style='color: #ffb822;'>${element.typeName}</span>`;

      }
    }

    const infoWindow = new BMap.InfoWindow(txt, opts);

    marker.addEventListener('click', function () {
      that.model.deviceId = mess.id;
      that.model.infoW = baiduMap.openInfoWindow(infoWindow, point); // 开启信息窗口

      const obj = document.getElementById(`select${mess.id}`);
      if (obj) {
        // obj.append(new Option('请选择处理用户', ''));
        for (let i = 0; i < that.model.userList.length; i++) {
          // console.log('option');
          (<any>obj).append(new Option(that.model.userList[i].userName, that.model.userList[i].userName));
        }
      }
      setTimeout(() => {
        that.deviceAddEventListener(mess);
      }, 0);
      console.log(mess);
    });

  }
  // 点击处理按钮事件
  deviceAddEventListener(mess) {
    const that = this;
    const m = `massage-lsq${mess.id}`;
    const p = `massage-post${mess.id}`;
    const selId = `select${mess.id}`;
    const message_l = document.getElementById(m);
    const message_p = document.getElementById(p);
    const selectUser = document.getElementById(selId); // 用户下拉列表
    let curUser = '';
    if (selectUser) {
      selectUser.addEventListener('change', function () { // 用户下拉列表 - 监听事件
        const selIndex = selectUser['selectedIndex'];
        curUser = that.model.userList[selIndex].id;
      });
    }
    if (message_p) {
      message_p.addEventListener('click', function () { // 处理按键 - 监听事件
        if (curUser) {
          const deviceId = that.model.deviceId;
          // console.log('deviceId');
          // console.log(deviceId);
           that.setDeviceIssues(deviceId, 0, 1, message_l['value'], curUser);
           that.map.closeInfoWindow(that.model.infoW1); // 关闭窗口
           that.getMessage(); // 刷新消息列表
          }
      });
    }
  }
  // 设置指定设备事件状态
  setDeviceIssues(issueId, orgState, state, comment, curUser) {
    const that = this;
    this.videoService.setDeviceIssues(issueId, orgState, state, comment, curUser).subscribe({
      next: function () {
        if (that.model.infoW) {
          that.model.infoW.clickclose();
        }

      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const zoom = this.switchZone(city.level);
    console.log(city);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);
  }

  // 获取数据

  // 获取城市列表 --ok
  getCity() {
    const that = this;

    this.monitorService.getZoneDefault(this.deviceTypeId).subscribe({
      next: function (val) {
        that.map_model.cityList = val.regions;
        // that.zoom = that.switchZone(val.zone.level);
        that.zone = val.zone;
        that.node = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
        // that.node = that.getNode(val.regions, val.zone.region_id);
        that.map_model.currentCity = that.node;
        that.map_model.currentChildren = that.node.children;

      },
      complete: function () {
        const zoom = that.map.getZoom();
        const point =  new BMap.Point(that.zone.center.lng, that.zone.center.lat); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
        that.map.centerAndZoom(point, zoom);
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

    return that.node;
  }

// 进入数据监控页面
jumpHandle() {
  this.router.navigate([`home/application/issuedata`]);

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
    this.map_model.currentCity = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.map_model.currentChildren = city.children;
  }

  selecteblock(block) {
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
    this.map_model.currentArea = block;
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

    this.map_model.currentBlock = area.children;
  }
  // 离开区域
  arealistMouseleave() {
    this.areashow = false;
    this.map_model.currentBlock = [];
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
    this.map_model.currentBlock = [];
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
