import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AUTHORITYTREE } from '../../../data/Authority.tree';

import { RightService } from '../../../service/right.service';

declare var $: any;
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  zTreeObj: any;

  zNodes = AUTHORITYTREE;
  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）


  role: any = {}; // 存储数据

  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  // 弹框
  closeResult: string;
  roleList = []; // 角色表

  queryStr = ''; // 检索字符串
  page: any;
  pageSize = 10;
  total: any;

  curDesk: any; // 当前检索
  AddorUpdate: any; // 新增/修改标识

  currentTreeNodeId: any; // 当前选中的区域
  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void; // 触发勾选树的事件

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private rightService: RightService) {

    this.page = 1;
    // 树的操作
    // 点击
    const that = this;
    // const a = Object.values( this.role.authorities );
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选
      this.role.authorities = {}; // 重新赋值前先清空
      // 获取树的节点
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
     // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
      nodes.map((item, i) => {
      that.role.authorities[item.id] = item.name;
      });
    };
  }

  ngOnInit() {
    this.getRoleList();
  }




  // 获取所有角色
  getRoleList() {
    const that = this;
    this.rightService.getAllRole(this.queryStr, this.page, this.pageSize).subscribe({
      next: function(val) {
        that.roleList = val.items;
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 打开新增角色 框
  openAddRole(content) {
    const that = this;
    this.AddorUpdate = '新增角色';
    this.role.name = '';

    // this.role.deskListChecked = []; // 新建用户时各角色的选中状态（check）
    this.role.authorities = {};
    // 此处添加树
    // this.zNodes.map((item, i) => {
    //   that.role.deskListChecked.push({check: true}); // 对应树结构
    // });
    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // 树状图
    this.setZtreeNode([]);
  }

  // 新增角色
  addRole() {
    const that = this;
    this.rightService.addNewRole(this.role.name, this.role.authorities).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新增成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getRoleList();
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
  // 打开修改角色 框
  openUpdateRole(content, item) {
    const that = this;
    this.AddorUpdate = '修改角色';
    this.role.curRole = item; // 所修改的用户
    this.role.name = item.name;
    this.role.authorityIds = this.getkeys(item.authorities);
    this.role.authorities = item.authorities; // 权限加上
    // this.role.deskListCheck = []; // 新建及修改用户时各角色的选中状态（check）
    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.setZtreeNode(this.role.authorityIds);
  }
  // 修改角色点击事件
  updateRole() {
    const that = this;
    this.rightService.updateRole(this.role.curRole.id, this.role.name, this.role.authorities).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getRoleList(); // 获取所有角色
      },
      error: function (error) {
        console.log(error);
        const message = error.errovr.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `修改失败：${message}！`,
        });
      }
    });

  }
  // 新增/修改角色 - 模态框 确认点击事件
  addorUpdt() {
    const that = this;
    if (this.AddorUpdate === '新增角色') {
      that.addRole();
    } else {
      that.updateRole();
    }
  }
  // 删除 弹框
  openDelRole(content, item) {
    const that = this;
    that.role.itemDelId = item.id;
    const modal = that.modalService.open(content, { size: 'sm' });
    that.mr = modal;
  }

  // 删除设备规则
  closeUser($event) {

    if ($event === 'ok') {
      this.delRole();
    }
    this.mr.close();
  }
  // 删除设备-接口处
  delRole() {
    const that = this;
    const id = this.role.itemDelId;
    let flag = false;
    const pages = (this.total + this.pageSize - 1) / this.pageSize;
    if (this.page >= pages && this.roleList.length === 1) {
      flag = true;
    }
    this.rightService.deleteRole(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
      },
      complete: function () {
        if (flag) {
          that.page  = that.page - 1;
          that.getRoleList();
        } else {
          that.getRoleList();
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 分页
  pageChange() {
    this.getRoleList();
  }
  // 检索用户的账户名或姓名
  execQuery() {
    this.getRoleList();
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

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
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
        chkStyle: 'checkbox',
        chkboxType: { 'Y': 'ps', 'N': 'ps' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };

    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
  }

  setZtreeNode(roleRoles) { // 修改：传入当前用户角色名数组；新建：传入空数组
    const that = this;
    // 树结构，树设置
    this.getZoneTree();
    // treeDemo界面中加载ztree的div
    const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    if ( !roleRoles) {
      return;
    }
    roleRoles.map((item, i) => {
      const node = treeObj.getNodeByParam('id', item, null); // 传入id
      if (node) {
        treeObj.checkNode(node, true, false ); // 此处是用户勾选
        // this.findParent(node.getParentNode());
      }
    });
  }
  findParent(node) {
    // 判断node为空的时候
    if (!node) {
      return ;
    }
    const p = node.getParentNode();
    if (p && !p.open) {
      p.open = true;
    }
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

