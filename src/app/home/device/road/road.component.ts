
import { Component, OnInit , Input} from '@angular/core';
import { RoadService } from '../../../service/road.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})
export class RoadComponent implements OnInit {
  // 行政区树
  zTreeObj: any;
  roadList = [];
  regionsList = [];
  queryStr = '';
  page = 1;
  pageSize = 10;
  total = 0;
  addOrUpdate = '新建道路'; // 新建/修改标识
  ROADMODEL: any = {};
  road: any = {};
  regionsIds = [];


  public mr: NgbModalRef; // 当前弹框
  modelData = { // 弹框
    title: '删除',
  };

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
    const that = this;
    // 树的操作
    // 点击
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
      console.log(nodes);
      that.ROADMODEL.regions = [];
      nodes.map(item => {
        that.ROADMODEL.regions.push({
          center : item.center,
          full_name : item.full_name,
          id : item.id,
          name : item.name,
          level : item.level,
        });
      });
      console.log(that.ROADMODEL.regions);
    };
    this.ROADMODEL.regions = [];
    // this.regionsList = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];

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
    this.getRegions();
    this.getlogs();
  }

  setZtreeNode(regionsIds) { // 修改：传入当前用户角色名数组；新建：传入空数组
    const that = this;
    console.log(regionsIds);
    console.log('regionsIds');
    // 树结构，树设置
    this.getZoneTree();
    // treeDemo界面中加载ztree的div
    const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    if (!regionsIds) {
      return;
    }
    regionsIds.map((item, i) => {
      const node = treeObj.getNodeByParam('id', item, null); // 传入id
      if (node) {
        treeObj.checkNode(node, true, false); // 此处是用户勾选
        // this.findParent(node.getParentNode());
      }
    });
  }
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
  getZoneTree() {
    const that = this;
    const setting = {
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      check: {
        enable: true,
        chkStyle: 'checkbox', // 勾选框类型(checkbox 或 radio）
        radioType: 'all', // 对所有树实现单选
        chkboxType: { 'Y': '', 'N': '' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.regionsList);
  }

   // 获取行政区域
  getRegions() {
    const that = this;

    this.roadService.getRegions()
      .subscribe({
        next: function (val) {
          that.regionsList = val;
          // window.localStorage.regionsList = JSON.stringify(val);
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 分页获取道路
  getlogs() {
    const that = this;

    this.roadService.getRoads( this.page, this.pageSize, this.queryStr)
      .subscribe({
        next: function (val) {
          that.roadList = val.items;
          that.total = val.total;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 添加道路
  addRoads() {
    const that = this;
    const body = {
      wayName: this.ROADMODEL.wayName,
      regions: this.ROADMODEL.regions
    };

    this.roadService.addRoads(body)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '新增成功！',
          });
          that.mr.close();
        },
        complete: function() {
          that.getlogs();
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
// 删除道路
  delroads() {
    const that = this;
    const id = this.road.itemDelId;
    const wayIds = [];
    wayIds.push(id);
    const body  = {
      wayIds: wayIds
     };
    this.roadService.delRoads(body)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '删除成功！',
          });
        },
        complete: function () {
          that.getlogs();
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 修改道路

  updetaRoads() {
    const that = this;
    const body = {
      wayName: this.ROADMODEL.wayName,
      regions: this.ROADMODEL.regions,
      wayId: this.ROADMODEL.wayId
    };
    this.roadService.updetaRoads(body)
      .subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '修改成功！',
          });
          that.mr.close();
        },
        complete: function () {
          that.getlogs();
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

  // 返回
  goback() {
    window.history.back();
  }
  // 新建道路弹框
  openNew(content) {
    const that = this;
    this.addOrUpdate = '新建道路';
    const modal = this.modalService.open(content);
    this.mr = modal;
    modal.result.then((result) => {
      // this.showPosiTable = false;
    }, (reason) => {
      // this.showPosiTable = false;
    });
    // 树结构，树设置
    this.setZtreeNode([]);
  }
  // 修改弹框
  openUpdata(content, item) {
    const that = this;
    this.addOrUpdate = '修改道路';
    this.ROADMODEL.wayId = item.wayId;
    this.ROADMODEL.wayName = item.wayName;
    this.ROADMODEL.regions = item.regions;
    this.regionsIds = this.getkeys(item.regions);
    console.log('ROADMODEL');
    console.log(this.ROADMODEL);
    const modal = this.modalService.open(content);
    this.mr = modal;
    modal.result.then((result) => {
      // this.showPosiTable = false;
    }, (reason) => {
      // this.showPosiTable = false;
    });
    // 树结构，树设置
    this.setZtreeNode(this.regionsIds);
  }

  // 获取对象value
  getkeys(arr) {
    // if (!obj) {
    //   return;
    // }
    // return Object.keys(obj);
    const ids = [];
    if (!arr) {
      return ids;
    }

    arr.map(item => {
      ids.push(item.id);
    });
    return ids;

  }

  // 新建道路 or 修改
  addorUpdate() {
    if (this.addOrUpdate === '新建道路') {
      this.addRoads();
    } else {
      this.updetaRoads();
    }

  }

  // 删除弹框
  openDel(content, item) {
    this.road.itemDelId = item.wayId;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }


  // 删除设备规则
  closeDelRoad($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delroads();
    }
    this.mr.close();
  }


  // 分页获取数据
  pageChange() {
    this.getlogs();
  }

  // 搜索
  dataSearch() {
    this.page = 1;
    this.getlogs();
  }

}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
