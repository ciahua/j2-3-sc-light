import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MonitorService } from '../../../service/monitor.service';
import { Point } from '../../../data/point.type';

declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_TOP_LEFT;

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
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

  constructor(private modalService: NgbModal, private monitorService: MonitorService) { }

  ngOnInit() {
    this.getCityDropdownList();
  }
  openAddSurveys(content) {  // 批量导入
    const that = this;
    this.modalService.open(content, { windowClass: 'md-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  openNewSurvey(content) { // 新建设备
    const that = this;
    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.addBaiduMap();
    this.getCity();
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  addBaiduMap() {
    const map = this.map = new BMap.Map('survey_map', {
      enableMapClick: true,
      // minZoom: 11
    }); // 创建地图实例
    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别
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
        that.addBaiduMap(); // 创建地图

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
        console.log(that.cityList1);
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
