import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { RightService } from '../../../service/right.service';


@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  zTreeObj: any;

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

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
  AddorUpdate: any; // 新增/修改标识

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private rightService: RightService) {

    this.page = 1;

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
        // console.log(that.roleList);
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

    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  // 新增角色
  addRole() {
    const that = this;
    this.rightService.addNewRole(this.role.name).subscribe({
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
    this.role.curRole = item;
    this.role.name = item.name;

    const modal = this.modalService.open(content, { windowClass: 'md' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  // 修改角色
  updateRole() {
    const that = this;
    this.rightService.updateRole(this.role.curRole.id, this.role.name).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
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
    this.role.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }

  // 删除设备规则
  closeUser($event) {
    // console.log($event);
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

  pageChange() {
    this.getRoleList();
  }

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
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
