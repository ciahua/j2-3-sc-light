import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MonitorService } from '../../../service/monitor.service';
import { DeviceService } from '../../../service/device.service';
import { Point } from '../../../data/point.type';

declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  closeResult: string;
  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentChildren: any; // 当前城市节点
  currentBlock: any; // // 当前城市街道
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  deviceshow = false; // 默认设备列表不显示

  visible = true; // 控制可视区域

  cityList1: any; // 城市列表
  deviceList1: any; // 城市列表
  defaultZone1: any; // 默认城市
  currentCity1: any; // 当前城市
  currentChildren1: any; // 当前城市节点
  currentBlock1: any; // // 当前城市街道
  areashow1 = false; // 默认区域列表不显示
  cityshow1 = false; // 默认区域列表不显示
  deviceshow1 = false; // 默认设备列表不显示
  node1 = null; // 用于递归查询JSON树 父子节点
  visible1 = true; // 控制可视区域

  zoom: any; // 地图级数
  SouthWest: Point; // 地图视图西南角
  NorthEast: Point; // 地图视图东北角
  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点

  deviceslist = [];  // 设备列表
  page: any;
  pageSize = 10;
  total: number;
  deviceModels = [];  // 设备型号列表
  deviceModels1 = [];
  currentType: any; // 当前设备型号

  device: any = {}; // 存储数据
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };

  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;

  constructor(private modalService: NgbModal, private monitorService: MonitorService,
    private deviceService: DeviceService) {

    this.page = 1;
    this.device.point = {lng: '', lat: ''};
  }

  ngOnInit() {
    this.getCity();
    // this.getDevice();
    this.getAllDeviceModel();
    this.getCityDropdownList();
    this.getDevicesList(this.page, this.pageSize);
  }

  // 获取设备型号列表
  getAllDeviceModel() {
    const that = this;
    this.deviceService.getAllDeviceModel(0, 1, 20).subscribe({
      next: function (val) {
        that.deviceModels1 = val.items;
        that.deviceModels = val.items.map((item) => Object.assign({}, item));
        that.deviceModels.unshift({ id: 0, name: '不限' }); // 所有项
        that.currentType = that.deviceModels[0];
        that.device.model = that.deviceModels1[0];
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 获取设备类型列表
  // getDevice() {
  //   const that = this;
  //   this.monitorService.getDevice().subscribe({
  //     next: function (val) {
  //       that.deviceModels = val;
  //       that.deviceModels.unshift({ id: 0, name: '不限' }); // 所有项
  //       that.currentType = val[0];
  //     },
  //     complete: function () { },
  //     error: function (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  // 获取设备分页
  getDevicesList(page, pageSize) {
    const that = this;
    this.deviceService.getAllDevice(page, pageSize).subscribe({
      next: function (val) {
        that.deviceslist = val.items;
        that.total = val.total;
        // console.log(that.deviceslist);
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 设备类型选择
  deviceTypeChange() {
    // 显示特定型号的设备列表分页
    // console.log(this.currentType);
  }
  // 分页
  pageChange() {
    this.getDevicesList(this.page, this.pageSize);
  }

  // 批量导入
  openAddSurveys(content) {
    const that = this;
    this.modalService.open(content, { windowClass: 'md-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  // 新建设备
  openNewSurvey(content) {
    this.device.name = '';
    this.device.model = this.deviceModels1[0];
    this.device.descr = '';

    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.addBaiduMap();

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      console.log(this.closeResult);
      this.addDevice();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  // 修改设备
  openUpdataDevice(content, item, i) {
    const that = this;
    this.device.updataId = item.id;
    this.device.name = item.name;
    this.device.point = item.point;
    const id = item.modelId;

    for (let index = 0; index < this.deviceModels1.length; index++) {
      const element = that.deviceModels1[index];
      console.log(index);
      if (id === element.id) {
        that.device.model = that.deviceModels1[index];
        break;
      }
    }
    this.device.descr = item.description;

    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.addBaiduMap();

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      console.log(this.closeResult);
      that.updataDevice();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  // 修改设备信息
  updataDevice() {
    const name = this.device.name;
    const modelId = this.device.modelId;
    const descr = this.device.descr;
    const lng = 133.33;
    const lat = 33.33;

    this.deviceService.updateDevice(name, modelId, descr, lng, lat).subscribe({
      next: function (val) {},
      complete: function () {},
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 删除设备弹框
  openDelDevice(content, item) {
    const that = this;
    this.device.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }
  // 删除设备规则
  closeDevice($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delDevice();
    }
    this.mr.close();
  }
  // 删除设备-接口处
  delDevice() {
    const that = this;
    const id = this.device.itemDelId;
    this.deviceService.delDevice(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
      },
      complete: function () {
        that.getDevicesList(that.page, that.pageSize);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 新增设备
  addDevice() {
    const name = this.device.name;
    const modelId = this.device.model.id;
    const descr = this.device.descr;
    const lng = 122.22;
    const lat = 22.22;

    this.deviceService.addNewDevice(name, modelId, descr, lng, lat).subscribe({
      next: function (val) {
      },
      complete: function () {},
      error: function (error) {
        console.log(error);
      }
    });
  }

  addBaiduMap() {
    const map = this.map = new BMap.Map('survey_map', {
      enableMapClick: true,
      // minZoom: 11
    }); // 创建地图实例
    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 17); // 设置中心和地图显示级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setMapStyle({ style: 'normal' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // 根据设备型号id返回设备型号名称
  modelName(modelId) {
    let modelName = null;
    this.deviceModels.map((item, i) => {
      if (item.id === modelId) {
        modelName = item.name;
      }
    });
    // console.log(modelName);
    return modelName;
  }

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
        // that.addBaiduMap(); // 创建地图

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
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
        zone = 17;
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
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const zoom = this.zoom = this.switchZone(city.level);
    const fullName = city.full_name;
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);



  }

  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.currentCity = city;
    this.node = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.currentChildren = city.children;
  }

  // 选择城市
  selecteCity1(city) {
    this.currentCity1 = city;
    this.node1 = city;
    this.currentChildren1 = city.children;
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
  arealistMouseNone() {
    this.areashow = true;
    this.currentBlock = null;
  }
  getCityDropdownList() {
    const that = this;
    this.monitorService.getZoneDefault().subscribe({
      next: function (val) {
        that.cityList1 = val.regions;
        that.currentCity1 = val.zone;
        // console.log(that.cityList1);
        // that.zoom = that.switchZone(val.zone.level);
        that.node1 = that.getNode(val.regions, val.zone.region_id);
        that.currentChildren1 = that.node1.children;
      },
      complete: function () {
        // that.addBaiduMap(); // 创建地图
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 显示区域
  showArea1() {
    this.areashow1 = true;
  }
  // 显示城市
  showCiyt1() {
    this.cityshow1 = true;
  }
  // 选择区域
  arealistMouseover1(area) {

    this.currentBlock1 = area.children;
  }
  // 离开区域
  arealistMouseleave1() {
    this.areashow1 = false;
    this.currentBlock1 = null;
  }
  // 离开城市
  citylistMouseleave1() {
    this.cityshow1 = false;
  }
  arealistMouseNone1() {
    this.areashow1 = true;
    this.currentBlock1 = null;
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
