import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../../../service/position.service';
import { Point } from '../../../data/point.type';
// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})

export class PositionComponent implements OnInit {
  @ViewChild('map1') map_container: ElementRef;
  model: any = {}; // 存储数据

  closeResult: string;
  map: any; // 地图对象

  cityList: any; // 城市列表
  deviceList = []; // 设备列表
  deviceTypes = []; // 设备列表
  currentType: any; // 当前搜索设备类别
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentArea: any; // 当前区域
  currentChildren: any; // 当前城市节点
  currentBlockList: any; // // 当前城市街道列表
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示


  visible = true; // 控制可视区域

  zoom: any; // 地图级数

  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点---当前城市

  positionListItems = []; // 位置列表
  positionList: any; // 位置列表
  total: number; // 分页
  page: number;
  pagesize = 10;


  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };

  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;


  constructor(private modalService: NgbModal, private positionService: PositionService) {
    this.page = 1;
    this.model.point = {lng: '', lat: ''};
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
    this.getCity();
    this.getDevice();
    this.getPosition(0, this.page, this.pagesize);
  }

  changeName(modelId) {
    let modelName;
    this.deviceTypes.map((item, i) => {
      if (item.id === modelId) {
        modelName = item.name;
      }
    });
    // console.log(modelName);
    return modelName;
  }

  deviceTypeChange() {
    this.getPosition(this.currentType.id, this.page, this.pagesize);
  }

  // 新建位置弹框
  openNewPosition(content) {
    const that = this;
    this.model.name = ''; // name
    this.model.number = ''; // number
    this.model.point = { lng: '', lat: '' }; // 坐标

    that.currentChildren = that.currentCity.children; // 当前城市下的区域列表
    that.model.installZoneId = that.currentCity.installZoneId; // 安装区域
    that.currentArea = that.currentChildren[0].children[0]; // 当前区域

    that.model.device = this.deviceList[0]; // 类型

    const modal = this.modalService.open(content, { size: 'lg' });
    this.addBaiduMap();

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      that.setPosition();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });

  }


    // 新增位置信息
  setPosition() {
    const that = this;
    const installZoneId = this.model.installZoneId;
    const regionId = this.currentArea.id;
    const name = this.model.name;
    const number = this.model.number;
    const point = this.model.point;
    const type = this.model.device.id;

    this.positionService.setPosition(installZoneId, regionId, name, number, point, type).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新建成功！',
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
      },
      complete: function () {
        that.getPosition(that.currentType.id, that.page, that.pagesize);
      },
      error: function (error) {
        console.log(error);
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: '新建失败！',
        });
      }
    });
  }

  // 修改位置
  openUpdataPosi(content, item, i) {
    const that = this;
    this.model.updataId = item.id;
    // this.model.installZoneId = item.installZoneId;
    this.model.installZoneId = item.installZoneId; // 安装区域
    this.model.name = item.name; // name
    this.model.number = item.number; // number
    this.model.point = item.point; // point

    const id = item.type; // 类型
    for (let index = 0; index < this.deviceList.length; index++) {
      const element = this.deviceList[index];
      if (id === element.id) {
        that.model.device = this.deviceList[index];
      }
    }

    let region_id; // 当前城市id
    const crrentProvince = this.cityList[0]; // 当前省会
    for (let index = 0; index < crrentProvince.children.length; index++) {
      const element = crrentProvince.children[index];
      if (item.installZoneId === element.installZoneId) {
        region_id = element.id;
      }
    }
    that.node = null; // 用于递归查询JSON树 父子节点
    that.currentCity = that.getNode(that.cityList, region_id); // 当前城市
    that.currentChildren = that.node.children; // 当前城市下的区域列表
    that.model.installZoneId = that.node.installZoneId; // 安装区域


    const area_id = item.regionId; // 当前区域id
    that.node = null; // 用于递归查询JSON树 父子节点
    that.currentArea = that.getNode(that.cityList, area_id); // 当前区域i

    const modal = this.modalService.open(content, { size: 'lg' });
    this.addBaiduMap();
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      that.updataPosition();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }


  // 修改位置信息
  updataPosition() {
    const that = this;
    const id = this.model.updataId;
    const installZoneId = this.model.installZoneId;
    const regionId = this.currentArea.id;
    const name = this.model.name;
    const number = this.model.number;
    const point = this.model.point;
    const type = this.model.device.id;

    this.positionService.updataPosition(id, installZoneId, regionId, name, number, point, type).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
      },
      complete: function () {
        that.getPosition(that.currentType.id, that.page, that.pagesize);
      },
      error: function (error) {
        console.log(error);
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: '修改失败！',
        });
      }
    });
  }

  // 删除位置弹框
  openDelPosi(content, item, i) {
    const that = this;
    this.model.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除位置规则
  closePosition($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delPosition();
    }
    this.mr.close();
  }

  // 删除位置-接口处
  delPosition() {
    const that = this;
    const id = this.model.itemDelId;
    this.positionService.delPosition(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
      },
      complete: function () {
        that.getPosition(that.currentType.id, that.page, that.pagesize);
      },
      error: function (error) {
        console.log(error);
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: '删除失败！',
        });
      }
    });
  }

  // 获取位置
  getPosition(type: number, page: number, pagesize: number) {
    const that = this;
    this.positionService.getPosition(type, page, pagesize).subscribe({
      next: function (val) {
        that.positionList = val;
        that.total = val.total;
        that.positionListItems = val.items;

      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 分页
  pageChange() {
    this.getPosition(this.currentType.id, this.page, this.pagesize);
  }

  // 获取设备列表
  getDevice() {
    const that = this;
    this.positionService.getDevice().subscribe({
      next: function (val) {
        that.deviceList = val;
        that.model.device = val[0];
        that.deviceTypes = val.map((item) => Object.assign({}, item));
        that.deviceTypes.unshift({ id: 0, name: '不限' }); // 所有项
        that.currentType = that.deviceTypes[0];
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 选择设备
  deviceChange() {
    console.log(this.model.device);
  }

  // 获取城市列表
  getCity() {
    const that = this;

    this.positionService.getZoneDefault().subscribe({
      next: function (val) {
        that.cityList = val.regions;
        that.zoom = that.switchZone(val.zone.level);
        that.currentCity = that.getNode(that.cityList, val.zone.region_id); // 当前城市
        that.currentChildren = that.currentCity.children; // 当前城市下的区域列表
        that.model.installZoneId = that.currentCity.installZoneId; // 安装区域
        that.currentArea = that.currentChildren[0].children[0]; // 当前区域

      },
      complete: function () {
        //  that.addBaiduMap(); // 创建地图

      },
      error: function (error) {
        console.log(error);
      }
    });
  }


  openAddPositions(content) {
    const that = this;

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });

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
  // 添加地图实例
  addBaiduMap() {
    const map = this.map = new BMap.Map('position_map', {
      enableMapClick: true,
      // minZoom: 11
    }); // 创建地图实例
    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setMapStyle({ style: 'normal' });
    this.mapClickOff(map);
  }

  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.model.point = e.point;

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
  selecteCity(city, i) {
    this.model.installZoneId = city.installZoneId; // 安装区域
    this.model.point = { lng: '', lat: '' };
    this.currentCity = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.currentChildren = city.children;
    this.currentArea = null;
  }

  selecteblock(block) {
    this.currentArea = block;
    this.model.point = { lng: '', lat: '' };
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

    this.currentBlockList = area.children;
  }
  // 离开区域
  arealistMouseleave() {
    this.areashow = false;
    this.currentBlockList = null;
  }
  // 离开城市
  citylistMouseleave() {
    this.cityshow = false;
  }
  arealistMouseNone() {
    this.areashow = true;
    this.currentBlockList = null;
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
