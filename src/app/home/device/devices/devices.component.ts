import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MonitorService } from '../../../service/monitor.service';
import { DeviceService } from '../../../service/device.service';
import { GradOverlar } from '../../../service/grad.overlay';

declare let BMap;

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
  currentArea: any; // 当前区域
  currentChildren: any; // 当前城市节点
  currentBlock: any; // // 当前城市街道
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  deviceshow = false; // 默认设备列表不显示
  visible = true; // 控制可视区域
  zoom: any; // 地图级数
  SouthWest: any; // 地图视图西南角
  NorthEast: any; // 地图视图东北角
  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点
  deviceslist = [];  // 设备列表
  page: any;
  pageSize = 10;
  total: number;
  deviceModels = [];  // 设备型号列表
  deviceModels1 = [];
  currentModel: any; // 当前设备型号
  queryStr: any; // 检索字符串
  queryStrPosi: any; // 按区域显示的位置点，检索字符串
  device: any = {}; // 存储数据
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  posiListByRegion = []; // 按区域返回的位置点列表
  pagePosi: any;
  pageSizePosi = 10;
  total1: number;
  showPosiTable = false; // 默认不显示表格内容，只显示表头
  bindedPosition: any; // 修改的设备
  addOrUpdate: any; // 新建/修改标识
  curModelIndex: any; // 当前设备型号标识

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private modalService: NgbModal, private monitorService: MonitorService,
    private deviceService: DeviceService) {
    this.page = 1;
    this.pagePosi = 1;
    this.curModelIndex = 0; // 全选
    this.queryStr = '';
    this.queryStrPosi = '';
    this.device.point = {lng: '', lat: ''};
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  ngOnInit() {
    this.getCity();
    this.getAllDeviceModel();
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
        that.currentModel = that.deviceModels[0]; // 默认显示“不限”
        that.curModelIndex = that.currentModel.id; // 标识
        that.device.model = that.deviceModels1[0];
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 获取设备分页
  getDevicesList(page, pageSize) {
    const that = this;
    this.deviceService.getAllDeviceByModel(this.queryStr, this.curModelIndex, page, pageSize).subscribe({
      next: function (val) {
        that.deviceslist = val.items;
        that.total = val.total;
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 设备类型选择
  deviceTypeChange() {
    this.curModelIndex = this.currentModel.id;
    this.getDevicesList(this.page, this.pageSize);
    // 显示特定型号的设备列表分页
  }
  // 检索按键点击事件
  execQuery() {
    this.getDevicesList(this.page, this.pageSize);
  }
  // 分页
  pageChange() {
    this.getDevicesList(this.page, this.pageSize);
  }
  pageChangePosi() {
    this.getPosiByRegionId(this.currentArea.id, this.pagePosi, this.pageSizePosi);
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
    this.addOrUpdate = '新建设备';
    this.device.name = '';
    this.device.model = this.deviceModels1[0];
    this.device.descr = '';
    this.device.bindedPosi = this.bindedPosition;
    this.bindedPosition = null;
    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.mr = modal;
    this.addBaiduMap();

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.showPosiTable = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.showPosiTable = false;
    });
  }
  addorUpdate(addOrUpdate) {
    if (addOrUpdate === '新建设备') {
      this.addDevice();
    } else {
      this.device.modelId = this.device.model.id; // 关闭模态框时同步modelId以便更新。device.model为双向绑定的设备类型
      this.updataDevice();
    }
  }
  // 新增设备
  addDevice() {
    const that = this;
    const name = this.device.name;
    const modelId = this.device.model.id;
    const descr = this.device.descr;
    const bindedPosi = this.bindedPosition;
    const lng = bindedPosi.point.lng;
    const lat = bindedPosi.point.lat;
    const posiId = bindedPosi.id;

    this.deviceService.addNewDevice(name, modelId, descr, posiId, lng, lat).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新建成功！',
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
        that.mr.close();
      },
      complete: function () {
        that.getDevicesList(that.page, that.pageSize);
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `新建失败: ${message}！`,
        });
      }
    });
  }
  // 修改设备
  openUpdataDevice(content, item, i) {
    this.queryStrPosi = '';
    this.addOrUpdate = '更新设备';
    const that = this;
    this.getPosiById(item.positionId); // device.positionId -> position. (设备->位置点)

    this.device.updateId = item.id;
    this.device.name = item.name;
    this.device.point = item.point;
    const id = item.modelId;

    this.device.descr = item.description;
    // 传入当前设备的类型
    for (let index = 0; index < this.deviceModels1.length; index++) {
      const element = that.deviceModels1[index];
      if (id === element.id) {
        that.device.model = that.deviceModels1[index]; // 设备型号为传入的item的型号
        break;
      }
    }
    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.mr = modal;
    this.addBaiduMap();
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  // 修改设备信息
  updataDevice() {
    const that = this;
    const id = this.device.updateId;
    const name = this.device.name;
    const modelId = this.device.modelId;
    const descr = this.device.descr;
    const bindedPosi = this.bindedPosition;
    const lng = bindedPosi.point.lng;
    const lat = bindedPosi.point.lat;
    const posiId = bindedPosi.id;
    this.deviceService.updateDevice(id, name, modelId, descr, posiId, lng, lat).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
        that.mr.close();
      },
      complete: function () {
        that.getDevicesList(that.page, that.pageSize);
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `修改失败: ${message}！`,
        });
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
    let flag = false;
    const pages = (this.total + this.pageSize - 1) / this.pageSize;
    if (this.page >= pages && this.deviceslist.length === 1) {
      flag = true;
    }
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
        if (flag) {
          that.page  = that.page - 1;
          that.getDevicesList(that.page, that.pageSize);
        } else {
          that.getDevicesList(that.page, that.pageSize);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // position表点击事件
  bindPosition(position) {
    this.map.clearOverlays();
    this.bindedPosition = position;
    const point = new BMap.Point(position.point.lng, position.point.lat);
    this.map.centerAndZoom(point, 18);
    const mySquare = new GradOverlar(point, 50, 'tag-bule');
    this.map.addOverlay(mySquare);
  }


  addBaiduMap() {
    const map = this.map = new BMap.Map('survey_map', {
      enableMapClick: true,
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

  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
  }

  // 根据positionId返回指定位置点
  getPosiById(id) {
    const that = this;
    let curPosition;
    this.deviceService.getPosiById(id).subscribe({
      next: function (val) {
        curPosition = val;
        that.bindedPosition = val;
        console.log(val);
      },
      complete: function () {
        that.updatePosiRegion();
        that.bindPosition(curPosition);
        that.getPosiByRegionId(curPosition.regionId, 1, that.pageSizePosi);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 传入'修改设备位置点所在区域'到模态框
  updatePosiRegion() {
    const that = this;
    let region_id; // 当前城市id
    const crrentProvince = this.cityList[0]; // 当前省会
    for (let index = 0; index < crrentProvince.children.length; index++) {
      const element = crrentProvince.children[index];
      if (that.bindedPosition.installZoneId === element.installZoneId) {
        region_id = element.id;
      }
    }

    that.node = null; // 用于递归查询JSON树 父子节点
    that.currentCity = that.getNode(that.cityList, region_id); // 当前城市
    that.currentChildren = that.node.children; // 当前城市下的区域列表
    const area_id = that.bindedPosition.regionId; // 当前区域id
    that.node = null; // 用于递归查询JSON树 父子节点
    that.currentArea = that.getNode(that.cityList, area_id); // 当前区域i
  }

  getCity() {
    const that = this;
    this.deviceService.getZoneDefault().subscribe({
      next: function (val) {
        that.cityList = val.regions;
        that.zoom = that.switchZone(val.zone.level);
        that.node = that.getNode(val.regions, val.zone.region_id);
        that.currentCity = that.node;
        that.currentChildren = that.node.children;
      },
      complete: function () {

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
  getPoint(baiduMap, city) {
    const zoom = this.zoom = this.switchZone(city.level);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);

  }

  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.device.installZoneId = city.installZoneId; // 安装区域
    this.device.point = { lng: '', lat: '' };
    this.currentCity = city;
    this.currentChildren = city.children;
    this.currentArea = null;
    this.node = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
  }

  // 街道点击事件
  selecteblock(block) {
    this.queryStrPosi = '';
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
    this.currentArea = block;
    this.device.point = { lng: '', lat: '' };
    this.pagePosi = 1;
    this.getPosiByRegionId(this.currentArea.id, this.pagePosi, this.pageSizePosi);
  }
  // 新建/修改设备中检索点击事件
  execQueryPosi() {
    this.pagePosi = 1;
    this.getPosiByRegionId(this.currentArea.id, this.pagePosi, this.pageSizePosi);
  }
  // 通过安装区域和检索字符串获取位置点
  getPosiByRegionId(regionId, page, pageSize) {
    const that = this;
    this.showPosiTable = true;
    this.deviceService.getAllPosiByRegionId(this.queryStrPosi, regionId, page, pageSize).subscribe({
      next: function (val) {
        that.posiListByRegion = val.items;
        that.total1 = val.total;
      },
      complete: function () {},
      error: function (error) {
        console.log(error);
      }
    });
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
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: 	devices.component.ts
@time: 2018 / 7 / 2 17: 18

*/
