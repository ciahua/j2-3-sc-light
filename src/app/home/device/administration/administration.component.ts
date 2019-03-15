import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoadService } from '../../../service/road.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
// baidu map
declare let BMap;
declare let BMAP_ANCHOR_TOP_LEFT;
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  @ViewChild('map1') map_container: ElementRef;

  queryStr = '';
  page = 1;
  pageSize = 10;
  total = 0;

  // 行政区树
  zTreeObj: any;
  regionsList = [];
  regionsListChildren = [];
  administration: any = {}; // 存储数据
  allRegin = [];
  parent = {
    id: '',
    name: '所有'
  };

  public mr: NgbModalRef; // 当前弹框
  modelData = { // 弹框
    title: '删除',
  };

  region: any = {}; // 删除当前
  addOrUpdate = '新增行政区域';
  RegionMODEL: any = {
    center: { lng: '', lat: '' },
    name: '',
    children: [],
    level: 1,
    id: null,
    parentId: null,

  }; // 新增数据类
  map: any = {}; // 地图
  address = '';
  // 关于树
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件

  @Input()
  public alerts: Array<IAlert> = []; // 信息弹框
  public alertsModal: Array<IAlert> = []; // 信息弹框
  private backup: Array<IAlert>;  // 信息弹框

  constructor(
    private roadService: RoadService,
    private modalService: NgbModal,
  ) {
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnClick = (event, treeId, treeNode) => { // 点击
      that.parent.id = treeNode.id;
      that.parent.name = treeNode.name;
      that.RegionMODEL.level = treeNode.level + 1;
      that.RegionMODEL.parentId = treeNode.id;
      that.page = 1;
      that.getChildRegions();
    };

    // this.regionsList = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];
    this.allRegin.push({
        full_name: '北京市',
        id: '',
        level: 0,
        name: '所有',
        open: true,
        children: this.regionsList,

    });

  }

  public closeAlert(alert: IAlert) {  // 信息弹框
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {  // 信息弹框
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  public reset() {  // 信息弹框
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
    // 树结构
    this.getZoneTree();
    this.getRegions();
    this.getChildRegions();
  }

  adGeocoder(name) {
    const myGeo = new BMap.Geocoder();
    const that = this;
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(name, function (point) {
      if (point) {
        that.map.centerAndZoom(point, 7);
        that.map.addOverlay(new BMap.Marker(point));
        that.RegionMODEL.center.lng = point.lng;
        that.RegionMODEL.center.lat = point.lat;
      } else {
        alert('您选择地址没有解析到结果!');
      }
    }, '');
  }

  // 添加地图实例
  addBaiduMap(...center) {
    const map = this.map = new BMap.Map('position_map', {
      enableMapClick: true,
      // minZoom: 11
    }); // 创建地图实例
    let point ;
    if (center) {
      point = new BMap.Point(center[0].lng, center[0].lat);
    } else {
      point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦

    }

    map.centerAndZoom(point, 7);
    map.addOverlay(new BMap.Marker(point));
    // map.centerAndZoom(point, 5); // 设置中心和地图显示级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    // 添加控件缩放
    // const offset = this.visible === true ? new BMap.Size(20, 140) : new BMap.Size(20, 15);
    const offset = new BMap.Size(5, 5);
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: offset,
    });
    map.addControl(navigationControl);
    map.setMapStyle({ style: 'normal' });
    this.mapClickOff(map);
  }

  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.RegionMODEL.center = e.point;
    });
  }


  allRegions() {
    this.parent.id = '';
    this.parent.name = '所有';
    this.getChildRegions();
  }

  // 获取行政区域
  getRegions() {
    const that = this;

    this.roadService.getRegions()
      .subscribe({
        next: function (val) {
          that.regionsList = val;
          that.allRegin = [];
          that.allRegin.push({
            full_name: '所有',
            id: '',
            level: 0,
            name: '所有',
            open: true,
            children: that.regionsList,

          });
          // // window.localStorage.regionsList = JSON.stringify(val);
        },
        complete: function () {
          that.getZoneTree();
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

     // 获取孩子行政区域-
  getChildRegions() {
    const that = this;

    // this.roadService.getChildRegions(parentId, this.page, this.pageSize, this.queryStr)
    this.roadService.getChildRegions(this.parent.id, this.page, this.pageSize, this.queryStr)
      .subscribe({
        next: function (val) {
          that.regionsListChildren = val.items;
          that.total = val.total;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 新建 or 修改
  addorUpdate() {
    if (this.addOrUpdate === '新增行政区域') {
      this.addRegions();
    } else {
      this.updetRegions();
    }

  }

  // 新增行政区域
  addRegions() {
    const that = this;
    const body = {
      center: this.RegionMODEL.center,
      children: this.RegionMODEL.children,
      name: this.RegionMODEL.name,
      parentId: this.RegionMODEL.parentId,

    };
    this.roadService.addRegions(body)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '新增成功！',
          });
          that.mr.close();
        },
        complete: function () {
          that.getChildRegions();
          that.getRegions();

        },
        error: function (error) {
          console.log(error);
          const message = error.error.errors[0].defaultMessage;
          that.alertsModal.push({
            id: 1,
            type: 'danger',
            message: `新增失败：${message}！`,
          });

        }
      });
  }

  // 修改行政区域
  updetRegions() {
    const that = this;
    this.roadService.updetRegions(this.RegionMODEL)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '新增成功！',
          });
          that.mr.close();
        },
        complete: function () {
          that.getChildRegions();
          that.getRegions();

        },
        error: function (error) {
          console.log(error);
          const message = error.error.errors[0].defaultMessage;
          that.alertsModal.push({
            id: 1,
            type: 'danger',
            message: `修改失败：${message}！`,
          });

        }
      });
  }

  // 删除行政区域
  delRegions() {
    const that = this;
    const id = this.region.itemDelId;
    const ids = [];
    ids.push(id);
    const body = {
      ids: ids
    };
    this.roadService.delRegions(body)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '删除成功！',
          });
        },
        complete: function () {
          that.getChildRegions();
          that.getRegions();

        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 新建弹框
  openNew(content) {
    const that = this;
    this.RegionMODEL.center = { lng: '', lat: '' };
    this.RegionMODEL.name = '';
    this.address = '';
    this.RegionMODEL.children = [];
    // delete this.RegionMODEL.id;
   // 新增数据类
    this.addOrUpdate = '新增行政区域';
    const modal = this.modalService.open(content, { size: 'lg'});
    this.mr = modal;
    this.addBaiduMap();
    modal.result.then((result) => {
      // this.showPosiTable = false;
    }, (reason) => {
      // this.showPosiTable = false;
    });
    // 树结构，树设置
    // this.setZtreeNode([]);
  }

  // 修改弹框
  openUpdata(content, item) {
    const that = this;
    this.addOrUpdate = '修改行政区域';
    this.RegionMODEL.id = item.id;
    this.RegionMODEL.name = item.name;
    this.RegionMODEL.center = item.center;
    this.RegionMODEL.level = item.level;
    this.address = item.full_name;


    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    this.addBaiduMap(item.center);
    modal.result.then((result) => {
      // this.showPosiTable = false;
    }, (reason) => {
      // this.showPosiTable = false;
    });
    // 树结构，树设置
    // this.setZtreeNode(this.regionsIds);
  }

  // 删除弹框
  openDel(content, item) {
    this.region.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }


  // 删除设备规则
  closeDelRegions($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delRegions();
    }
    this.mr.close();
  }

  // 分页
  pageChange() {
    this.getChildRegions();
  }


  // 点击搜索
  execQuery() {
    this.page = 1;
    this.getChildRegions();
  }



  getZoneTree() {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      // check: {
      //   enable: true,
      //   chkStyle: 'radio',
      //   radioType: 'all', // 对所有树实现单选
      //   chkboxType: { 'Y': 'ps', 'N': 'ps' }
      // },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      },
      key : {
        region_id : 'region_id',
        name : 'name',
    }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.allRegin);
  }

}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}

