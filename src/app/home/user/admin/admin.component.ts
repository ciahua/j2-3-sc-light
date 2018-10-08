import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../service/admin.service';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  zTreeObj: any;

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

      // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes = [
    {
      name: '设备概览', open: true, children: [
        { name: 'test1_1' }, { name: 'test1_2' }]
    },
    {
      name: '设备监控', open: true, children: [
        { name: 'test2_1' }, { name: 'test2_2' }]
    },
    {
      name: '设备管理', open: true, children: [
        { name: '新增' }, { name: '添加' }, { name: '报销' }]
    },
    {
      name: '系统管理', open: true, children: [
        {
          name: '用户管理', children: [
            { name: '新增' }, { name: '添加' }, { name: '修改' }
          ]
        },
        {
          name: '权限管理', children: [
            { name: '新增' }, { name: '添加' }, { name: '修改' }
          ]
        }
      ]
    }
  ];

  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  genderData = [
    {name: '男', value: 0},
    {name: '女', value: 1}
  ];

  user: any = {}; // 存储数据
  closeResult: string;
  userList = []; // 用户表
  roleList = []; // 角色表
  roleList1 = []; // 不含“不限”项
  queryStr = ''; // 检索字符串
  page: any;
  pageSize = 10;
  total: number;

  curRole: any; // 当前角色
  addOrUpdate: any; // 新建或修改标识
  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.page = 1;
  }

  ngOnInit() {
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    this.getUserList();
    this.getRoleList();
  }
  // 获取用户列表
  getUserList() {
    const that = this;
    this.adminService.getAllUser(this.queryStr, this.page, this.pageSize).subscribe({
      next: function(val) {
        that.userList = val.items;
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 获取角色列表
  getRoleList() {
    const that = this;
    this.adminService.getAllRole().subscribe({
      next: function(val) {
        that.roleList1 = val;
        that.roleList = val.map((item) => Object.assign({}, item));
        that.roleList.unshift({ id: 0, name: '不限' }); // 所有项
        that.curRole = that.roleList[0];
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 分页
  pageChange() {
    this.getUserList();
  }
  // 按角色筛选
  roleChange() {
    // console.log(this.curRole);
  }
  // 检索用户的账户名或姓名
  execQuery() {
    this.getUserList();
  }
  // 打开新增用户 框体
  openAddUser(content) {
    const that = this;
    this.addOrUpdate = '新建用户';
    this.user.userName = '';
    this.user.password = '';
    this.user.email = '';
    this.user.mobile = '';
    this.user.fullName = '';
    this.user.nickName = '';
    this.user.gender = '';
    this.user.avatar = '';

    this.user.roleListCheck = []; // 新建用户时各角色的选中状态（check）
    this.user.roleIds = [];
    this.roleList1.map((item, i) => {
      that.user.roleListCheck.push({check: false}); // 一一对应角色表roleList1
    });

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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // 新增用户点击事件
  addUser() {
    const that = this;
    this.adminService.addNewUser(this.user.userName, this.user.password, this.user.gender.value, this.user.avatar,
      this.user.email, this.user.mobile, this.user.fullName, this.user.nickName, this.user.roleIds).subscribe({
      next: function(val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新增成功！',
        });
      },
      complete: function() {
        that.mr.close();
        that.getUserList();
      },
      error: function(error) {
        const message = error.json().errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `新增失败：${message}！`,
        });
        console.log(error);
      }
    });
  }
  // 打开修改用户信息 框
  openUpdateUser(content, item) {
    console.log(item);
    const that = this;
    this.addOrUpdate = '修改用户';
    this.user.curUser = item; // 所修改的用户
    this.user.userName = item.userName;
    this.user.password = item.password;
    this.user.email = item.email;
    this.user.mobile = item.mobile;
    this.user.fullName = item.fullName;
    this.user.nickName = item.nickName;
    // this.user.gender = item.gender;
    if (item.gender === 0) {
      this.user.gender = this.genderData[0];
    } else {
      this.user.gender = this.genderData[1];
    }
    this.user.avatar = item.avatarurl;

    this.user.roleListCheck = []; // 新建用户时各角色的选中状态（check）
    this.user.roleIds = [];
    this.roleList1.map((item1, i) => {
      that.user.roleListCheck.push({check: false}); // 一一对应角色表roleList1
    });

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
  // 修改用户点击事件
  updataUser() {
    const that = this;
    this.adminService.updateUser(this.user.curUser.id, this.user.userName, this.user.password, this.user.gender.value, this.user.avatar,
      this.user.email, this.user.mobile, this.user.fullName, this.user.nickName, this.user.roleIds).subscribe({
      next: function(val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
      },
      complete: function() {
        that.mr.close();
        that.getUserList();
      },
      error: function(error) {
        const message = error.json().errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `修改失败：${message}！`,
        });
        console.log(error);
      }
    });
  }
  // 新建/修改用户点击事件
  addorUpdt() {
    if (this.addOrUpdate === '新建用户') {
      this.addUser();
    } else {
      this.updataUser();
    }
  }
  // 删除设备弹框
  openDelUser(content, item) {
    const that = this;
    this.user.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }

  // 删除设备规则
  closeUser($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delUser();
    }
    this.mr.close();
  }
  // 删除设备-接口处
  delUser() {
    const that = this;
    const id = this.user.itemDelId;
    let flag = false;
    const pages = (this.total + this.pageSize - 1) / this.pageSize;
    if (this.page >= pages && this.userList.length === 1) {
      flag = true;
    }
    this.adminService.deleteUser(id).subscribe({
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
          that.getUserList();
        } else {
          that.getUserList();
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // 为新建用户选定角色，多选按键点击事件
  addRoleToUser() {
    const that = this;
    this.user.roleIds = [];
    this.user.roleListCheck.map((item, i) => {
      if (item.check === true) {
        const item1 = that.roleList1[i].id;
        if (item1) {
          that.user.roleIds.push(item1);
        }
      }
    });
    console.log(this.user.roleIds);
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
