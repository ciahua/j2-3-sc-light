
import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../../service/customer.service';
import { AUTHORITYTREE } from '../../../data/Authority.tree';
declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerModelDate: any = {};

  // 行政区树
  zTreeObj: any;
  zNodes = [];

  // 权限树
  rTreeObj: any;
  rNodes = AUTHORITYTREE;
  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）

  // 弹框
  closeResult: string;
  // 新增/修改标识
  AddorUpdate: any;

  public mr: NgbModalRef; // 当前弹框
  InstallData = {
    title: '删除',
    body: 'hh',
  };
  // 关于树
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件
  public rTreeOnClick: (event, treeId, treeNode) => void;
  public rTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件

  // 安装区域列表
  List = [];

  queryStr = ''; // 检索字符串
  page = 1;
  pageSize = 10;
  total = 0;
  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private customerService: CustomerService) {
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
      console.log(nodes);
      this.customerModelDate.regionIds = [];
      nodes.map(item => {
        that.customerModelDate.regionIds.push(item.id);
      });

    };

    // 新增客户权限树
    this.rTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      this.customerModelDate.authorities = {}; // 重新赋值前先清空
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('rTreeDemo');
      const node = treeObj.getCheckedNodes(true);
      console.log(node);
     // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
      node.map((item, i) => {
      that.customerModelDate.authorities[item.id] = item.name;
      });
      console.log(that.customerModelDate.authorities);
    };

    // this.zNodes = window.localStorage.regionsList ? JSON.parse(window.localStorage.regionsList) : [];
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
    this.getInstallzone(); // 获取安装区域列表
    this.getRegions();
  }

  // 城市列表
  getRegions() {
    const that = this;
    this.customerService.getRegions()
      .subscribe({
        next: function (val) {
          that.zNodes = val;
          // window.localStorage.regionsList = JSON.stringify(val);
        }
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

  setZtreeNode(georegion, roles) { // 修改：传入当前用户角色名数组；新建：传入空数组
    // 树结构，树设置
    this.getZoneTree();
    this.getRZoneTree();
    console.log(roles);
    if ('' + roles === '' + {} || roles === undefined) {
      roles = [];
    }
    console.log(roles);
    // treeDemo界面中加载ztree的div
    const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    const rRreeObj = $.fn.zTree.getZTreeObj('rTreeDemo');
    if (!georegion && !roles) {
      return;
    }
    roles.map((item, i) => {
      const node = rRreeObj.getNodeByParam('id', item, null); // 传入id
      if (node) {
        rRreeObj.checkNode(node, true, false ); // 此处是用户勾选
        // this.findParent(node.getParentNode());
      }
    });
    georegion.map((item, i) => {
      const node = treeObj.getNodeByParam('id', item, null); // 传入id
      if (node) {
        treeObj.checkNode(node, true, false); // 此处是用户勾选
        // this.findParent(node.getParentNode());
      }
    });
  }
  getRZoneTree() {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      check: {
        enable: true,
        chkStyle: 'checkbox',
        chkboxType: { 'Y': '', 'N': '' }
      },
      callback: {
        onClick: this.rTreeOnClick, // 点击事件
        onCheck: this.rTreeOnCheck // 勾选事件
      }
    };

    this.rTreeObj = $.fn.zTree.init($('#rTreeDemo'), setting, this.rNodes);
    console.log(this.zTreeObj);
  }
  getZoneTree() {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      view: {
        selectedMulti: true,
        dblClickExpand: false,
        showLine: true,
      },
      check: {
        enable: true,
        chkStyle: 'checkbox', // 单选radio 多选 checkbox
        radioType: 'all', // 对所有树实现单选
        chkboxType: { 'Y': '', 'N': '' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
    console.log(this.zTreeObj);
  }

  // 获取安装区域列表 --ok
  getInstallzone() {
    const that = this;
    this.customerService.getCustomer(this.page, this.pageSize, this.queryStr).subscribe({
      next: function (val) {
        that.List = val.items;
        that.total = val.total;
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  pageChange() {
    this.getInstallzone();
  }

  execQuery() {
    this.page = 1;
    this.getInstallzone();
  }
  // 打开新增窗口
  openNewInstallZone(content) {
    const that = this;
    this.AddorUpdate = '新增客户';

    this.customerModelDate.name = '';
    this.customerModelDate.code = '';

    // 关于弹框
    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // 树状图
    // this.setRtreeNode([]);
    this.setZtreeNode([], []);
  }

  // 打开 修改 弹框
  openUpdata(contentUpdate, item) {
    console.log('item' +  item.regionIds + ': ' + item.authorities);
    console.log(item.authorities);
    this.AddorUpdate = '修改客户';
    this.customerModelDate.id = item.id;
    this.customerModelDate.name = item.name;
    this.customerModelDate.code = item.code;
    this.customerModelDate.regionIds = item.regionIds;
    this.customerModelDate.authorityIds = this.getkeys(item.authorities);
    this.customerModelDate.authorities = item.authorities;
    // 所修改的区域
    console.log(this.customerModelDate.authorityIds);
    // this.customerModelDate.geoRegionChecked = []; // 新建及修改用户时各角色的选中状态（check）
    const modal = this.modalService.open(contentUpdate, { size: 'lg' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.customerModelDate.authorityIds);
    this.setZtreeNode(item.regionIds, this.customerModelDate.authorityIds);
  }
  // 删除 安装 区域 弹框
  openDel(content, item) {
    const that = this;
    that.customerModelDate.itemDelId = item.id;
    const modal = that.modalService.open(content, { size: 'sm' });
    that.mr = modal;
  }


  // 新增/修改角色 - 模态框 确认点击事件
  addorUpdt() {
    const that = this;
    if (this.AddorUpdate === '新增客户') {
      that.addCustomer();
      console.log('新增');
    } else {
      that.updateCustomer();
      console.log('修改');
    }
  }

  // 新增客户
  addCustomer() {
    const that = this;
    const body = {
      name: this.customerModelDate.name,
      code: this.customerModelDate.code,
      authorities: this.customerModelDate.authorities,
      regionIds: this.customerModelDate.regionIds
    };
    this.customerService.addNewCustomer(body)
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
          that.getInstallzone(); // 获取安装区域列表
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

  // 修改安装区域
  updateCustomer() {
    const that = this;
    const body = {
      id: this.customerModelDate.id,
      name: this.customerModelDate.name,
      code: this.customerModelDate.code,
      authorities: this.customerModelDate.authorities,
      regionIds: this.customerModelDate.regionIds
    };
    this.customerService.updateCustomer(body)
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
          that.getInstallzone(); // 获取安装区域列表
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
  // 删除接口处
  delCustomer() {
    const that = this;
    const id = this.customerModelDate.itemDelId;
    // const body = {
    //   ids: []
    // };
    // body.ids.push(id);
    // console.log(id);
    this.customerService.deleteCustomer(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
      },
      complete: function () {
        that.getInstallzone();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 删除规则
  closeCustomer($event) {
    if ($event === 'ok') {
      this.delCustomer();
    }
    this.mr.close();
  }

   // 获取对象value
   getkeys(obj) {
    if (!obj) {
        return;
    }
    return Object.keys(obj);
  }
  // 获取对象value
  getVaule(obj) {
    if (!obj) {
        return;
    }
    return Object.values(obj);
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
