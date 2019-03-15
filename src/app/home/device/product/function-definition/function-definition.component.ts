import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute} from '@angular/router';
import { TYPEDATA, TYPEDATA1} from '../../../../data/type-data';
import { UNITDATA} from '../../../../data/unit-data';
import { FunctionDefinitionService} from '../../../../service/function-definition';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-function-definition',
  templateUrl: './function-definition.component.html',
  styleUrls: ['./function-definition.component.scss']
})
export class FunctionDefinitionComponent implements OnInit {
  public mr: NgbModalRef; // 当前弹框
  public mr2: NgbModalRef; // 当前弹框
  closeResult: string;
  dataModel: any = {}; // 数据定义数据
  functionModel: any = {}; // 服务定义数据
  deviceParams: any = {}; // 设备信息
  TYPEDATA1 = TYPEDATA; // 数据类型
  UNITDATA1 = UNITDATA; // 单位
  TYPEDATA2 = TYPEDATA1; // 数据类型
  dataListItems = []; // 数据定义数据列表
  functionListItems = []; // 服务定义数据列表
  total = 1; // 分页
  page = 1; // 分页
  modelData = { // 删除弹框
    title: '删除',
  };

  navs = [ // 菜单
    {
      id: 0,
      name: '数据定义'
    },
    {
      id: 1,
      name: '服务定义'
    }
  ];
  nav_index = 0; // 菜单索引
  AddParamModel: any = {}; // 新增参数窗口数据
  AddParam = []; // 新增参数窗口
  messageIssue: any = {};
  addorupdate = '添加数据定义';
  delDataItemId: any;
  delDataItemFlag = 'property';

  @Input()
  public alerts: Array<IAlert> = []; // 信息弹框
  public alertsModal: Array<IAlert> = []; // 信息弹框
  private backup: Array<IAlert>;  // 信息弹框
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private routerinfo: ActivatedRoute,
    private functionDefinitionService: FunctionDefinitionService,
  ) {

    // 1 数据定义弹框
    this.dataModel.readOnly = false; // 读写
    this.dataModel.dataType = this.TYPEDATA1[0]; // 数据类型
    this.dataModel.unit = this.UNITDATA1[0]; // int参数
    this.dataModel.enums = []; // BOOL参数
    this.dataModel.BOOL = {}; // BOOL参数
    this.dataModel.dataLength = 1024; // TEXT参数

    // 2、添加参数弹框
    this.AddParamModel.dataType = this.TYPEDATA2[0]; // 新增参数窗口数据类型
    this.AddParamModel.unit = this.UNITDATA1[0]; // 单位{  // int参数
    this.AddParamModel.enums = []; // BOOL参数
    this.AddParamModel.BOOL = {}; // BOOL参数
    this.AddParamModel.dataLength = 1024; // TEXT参数


   // 3.服务定义弹框
    this.functionModel.synchrony = 1; // 异步同步 调用方式
    this.functionModel.param = []; // 参数列表
    this.functionModel.inputparam = []; // 输入参数列表
    this.functionModel.outputparam = []; // 输出参数列表


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
    this.deviceParams = JSON.parse(this.routerinfo.snapshot.params.param);
    console.log(this.deviceParams);
    this.getProperty();
    this.getService();
  }

  // 获取数据定义
  getProperty() {
    const that = this;
    const id = this.deviceParams.id;
    this.functionDefinitionService.getProperty(id).subscribe({
      next: function(val) {
        console.log(val);
        that.dataListItems = val;
      },
      error: function (error) {
        console.log(error);
        // const message = error.error.errors[0].defaultMessage;
        that.messageIssue = error.error.errors[0];
        // that.alerts.push({
        //   id: 1,
        //   type: 'danger',
        //   message: `${message}！`,
        // });
      }
    });
  }

  // 删除数据定义
  delProperty() {
    const that = this;
    const id = this.delDataItemId;
    this.functionDefinitionService.delProperty(id).subscribe({
      next: function(val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: `删除成功！`,
        });
      },
      complete: function() {
        that.getProperty();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `删除失败：${message}！`,
        });
      }
    });
  }



  // 获取服务定义
  getService() {
    const that = this;
    const id = this.deviceParams.id;
    this.functionDefinitionService.getService(id).subscribe({
      next: function (val) {
        console.log(val);
        that.functionListItems = val;
      },
      complete: function() {
      },
      error: function (error) {
        console.log(error);
        // const message = error.error.errors[0].defaultMessage;
        that.messageIssue = error.error.errors[0];
        // that.alerts.push({
        //   id: 1,
        //   type: 'danger',
        //   message: `${message}！`,
        // });
      }
    });
  }

  //    // 添加数据定义
  addProperty() {
    const that = this;
    if (!this.dataModel.name) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `名称不能为空！`,
      });
      return;
    } else if (!this.dataModel.dataKey) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `标识符不能为空！`,
      });
      return;
    }
    let body;
    switch (this.dataModel.dataType.Value.toLowerCase()) {
      case 'int':
      case 'float':
      case 'double':
      body = {
        // 'dataLength': this.dataModel.dataLength,
        'dataMax': this.dataModel.dataMax,
        'dataMin': this.dataModel.dataMin,
        'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'dataKey': this.dataModel.dataKey,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
      break;
      case 'date':
      body = {
        // 'dataLength': this.dataModel.dataLength,
        // 'dataMax': this.dataModel.dataMax,
        // 'dataMin': this.dataModel.dataMin,
        // 'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'dataKey': this.dataModel.dataKey,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        // 'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
      break;
      case 'text':
      body = {
        'dataLength': this.dataModel.dataLength,
        // 'dataMax': this.dataModel.dataMax,
        // 'dataMin': this.dataModel.dataMin,
        // 'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'dataKey': this.dataModel.dataKey,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        // 'resolution': this.dataModel.resolution,
        'describe': this.dataModel.describe,
      };
       break;
      case 'bool':
      const enums = [];
        enums.push({ name: this.dataModel.BOOL.no, value: 0});
        enums.push({ name: this.dataModel.BOOL.yes, value: 1});
      body = {
        // 'dataLength': this.dataModel.dataLength,
        // 'dataMax': this.dataModel.dataMax,
        // 'dataMin': this.dataModel.dataMin,
        // 'unit': this.dataModel.unit.Symbol,
        'dataType': this.dataModel.dataType.Value,
        // 'id': 0,
        'dataKey': this.dataModel.dataKey,
        'modelId': this.deviceParams.id,
        'name': this.dataModel.name,
        'readOnly': this.dataModel.readOnly,
        // 'resolution': this.dataModel.resolution,
        // 'describe': this.dataModel.describe,
        'enums': enums
      };
      break;
      default:
      break;
    }


    this.functionDefinitionService.addProperty(body).subscribe({
      next: function (val) {
        console.log(val);
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '数据添加成功！',
        });
        that.mr.close();
      },
      complete: function() {
        that.getProperty();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }

  //    // 修改数据定义
  updateProperty() {
    const that = this;
    if (!this.dataModel.name) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `名称不能为空！`,
      });
      return;
    } else if (!this.dataModel.dataKey) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `标识符不能为空！`,
      });
      return;
    }
    let body;
    switch (this.dataModel.dataType.Value.toLowerCase()) {
      case 'int':
      case 'float':
      case 'double':
        body = {
          'dataMax': this.dataModel.dataMax,
          'dataMin': this.dataModel.dataMin,
          'unit': this.dataModel.unit.Symbol,
          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'dataKey': this.dataModel.dataKey,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'resolution': this.dataModel.resolution,
          'describe': this.dataModel.describe,
        };
        break;
      case 'date':
        body = {

          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'dataKey': this.dataModel.dataKey,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'describe': this.dataModel.describe,
        };
        break;
      case 'text':
        body = {
          'dataLength': this.dataModel.dataLength,
          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'dataKey': this.dataModel.dataKey,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'describe': this.dataModel.describe,
        };
        break;
      case 'bool':
        const enums = [];
        enums.push({ name: this.dataModel.BOOL.no, value: 0 });
        enums.push({ name: this.dataModel.BOOL.yes, value: 1 });
        body = {
          'dataType': this.dataModel.dataType.Value,
          'id': this.dataModel.updateId,
          'dataKey': this.dataModel.dataKey,
          'modelId': this.deviceParams.id,
          'name': this.dataModel.name,
          'readOnly': this.dataModel.readOnly,
          'describe': this.dataModel.describe,
        };
        break;
      default:
        break;
    }


    this.functionDefinitionService.updateProperty(body).subscribe({
      next: function (val) {
        console.log(val);
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '数据修改成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getProperty();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }

  // 添加服务定义参数列表
  addParam () {
    const that = this;
    if (!this.AddParamModel.name) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `名称不能为空！`,
      });
      return;
    } else if (!this.AddParamModel.dataKey) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `标识符不能为空！`,
      });
      return;
    }

    if (!this.AddParamModel.dataType || !this.AddParamModel.dataType.Value) {
      return;
    }
    let isOutput = 'inputparam';
    if (this.AddParamModel.isOutput) {
      isOutput = 'outputparam';
    }
    switch (this.AddParamModel.dataType.Value.toLowerCase()) {
      case 'int':
      case 'float':
      case 'double':
        this.functionModel[isOutput].push(
          {
            'dataKey': this.AddParamModel.dataKey,
            // 'dataLength': this.AddParamModel.dataLength,
            'dataMax': this.AddParamModel.dataMax,
            'dataMin': this.AddParamModel.dataMin,
            'dataOrder': this.AddParamModel.dataOrder,
            'dataType': this.AddParamModel.dataType.Value,
            'dataUnit': this.AddParamModel.unit.Symbol,
            // 'id': 0,
            'isOutput': this.AddParamModel.isOutput,
            // 'modelServeId': 0,
            'name': this.AddParamModel.name
          }
        );
        break;
      case 'date':
        this.functionModel[isOutput].push(
          {
            'dataKey': this.AddParamModel.dataKey,
            // 'dataLength': this.AddParamModel.dataLength,
            // 'dataMax': this.AddParamModel.dataMax,
            // 'dataMin': this.AddParamModel.dataMin,
            // 'dataUnit': this.AddParamModel.unit.Symbol,
            'dataOrder': this.AddParamModel.dataOrder,
            'dataType': this.AddParamModel.dataType.Value,

            // 'id': 0,
            'isOutput': this.AddParamModel.isOutput,
            // 'modelServeId': 0,
            'name': this.AddParamModel.name
          }
        );
        break;
      case 'text':
        this.functionModel[isOutput].push(
          {
            'dataKey': this.AddParamModel.dataKey,
            'dataLength': this.AddParamModel.dataLength,
            // 'dataMax': this.AddParamModel.dataMax,
            // 'dataMin': this.AddParamModel.dataMin,
            // 'dataUnit': this.AddParamModel.unit.Symbol,
            'dataOrder': this.AddParamModel.dataOrder,
            'dataType': this.AddParamModel.dataType.Value,

            // 'id': 0,
            'isOutput': this.AddParamModel.isOutput,
            // 'modelServeId': 0,
            'name': this.AddParamModel.name
          }
        );
        break;
      case 'bool':
        const enums = [];
        enums.push({ name: this.AddParamModel.BOOL.no, value: 0 });
        enums.push({ name: this.AddParamModel.BOOL.yes, value: 1 });
        this.functionModel[isOutput].push(
          {
            'dataKey': this.AddParamModel.dataKey,
            // 'dataLength': this.AddParamModel.dataLength,
            // 'dataMax': this.AddParamModel.dataMax,
            // 'dataMin': this.AddParamModel.dataMin,
            // 'dataUnit': this.AddParamModel.unit.Symbol,
            'dataOrder': this.AddParamModel.dataOrder,
            'dataType': this.AddParamModel.dataType.Value,
            // 'id': 0,
            'isOutput': this.AddParamModel.isOutput,
            // 'modelServeId': 0,
            'name': this.AddParamModel.name,
            'paramEnums': enums
          }
        );
        break;
      default:
        break;
    }
    console.log(this.functionModel.param);
    this.mr2.close();



  }

  delParam(i, isOutput) {
    this.functionModel[isOutput].splice(i, 1);
  }

  // 添加服务定义
  addService() {
    const that = this;
    if (!this.functionModel.name) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `名称不能为空！`,
      });
      return;
    } else if (!this.functionModel.identifier) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `标识符不能为空！`,
      });
      return;
    }
    console.log(this.functionModel.inputparam);
    console.log(this.functionModel.outputparam);
    const param = [...this.functionModel.inputparam, ...this.functionModel.outputparam];
    console.log(param);
    const body = {
      'description': this.functionModel.description,
      'identifier': this.functionModel.identifier,
      'modelId': this.deviceParams.id,
      'name': this.functionModel.name,
      'params': param,
      'synchrony': this.functionModel.synchrony
    };
    this.functionDefinitionService.addService(body).subscribe({
      next: function (val) {
        console.log(val);
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '服务添加成功！',
          });
        that.mr.close();
      },
      complete() {
        that.getService();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }
  // 修改服务定义
  updateService() {
    const that = this;
    if (!this.functionModel.name) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `名称不能为空！`,
      });
      return;
    } else if (!this.functionModel.identifier) {
      that.alertsModal.push({
        id: 1,
        type: 'danger',
        message: `标识符不能为空！`,
      });
      return;
    }

    const param = [...this.functionModel.inputparam, ...this.functionModel.outputparam];
    const body = {
      'id': this.functionModel.updateId,
      'description': this.functionModel.description,
      'identifier': this.functionModel.identifier,
      'modelId': this.deviceParams.updateId,
      'name': this.functionModel.name,
      'params': param,
      'synchrony': this.functionModel.synchrony
    };
    this.functionDefinitionService.updateService(body).subscribe({
      next: function (val) {
        console.log(val);
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '服务修改成功！',
        });
        that.mr.close();
      },
      complete() {
        that.getService();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alertsModal.push({
          id: 1,
          type: 'danger',
          message: `${message}！`,
        });
      }
    });
  }

  // 删除服务定义
  delService() {
    const that = this;
    const id = this.delDataItemId;
    this.functionDefinitionService.delService(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: `删除成功！`,
        });
      },
      complete: function () {
        that.getService();
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `删除失败：${message}！`,
        });
      }
    });
  }
  addorupdateProperty() {
    if (this.addorupdate === '添加数据定义') {
      this.addProperty();
    } else {
      this.updateProperty();
    }
  }

  addorupdateService() {
    if (this.addorupdate === '添加服务定义') {
      this.addService();
    } else {
      this.updateService();
    }
  }

  // 删除
  closeModal($event) {
    console.log($event);
    if ($event === 'ok') {
      if (this.delDataItemFlag === 'property') {
        this.delProperty();
      } else {
        this.delService();
      }

    }
    this.mr.close();
  }


  // 切换菜单
  changeNav(i) {
    this.nav_index = i;
  }
  // 属性页面
  goToZheRoute(para, ...item) {
    if (item) {
      this.router.navigate([para, { param: item }]);
    } else {
      this.router.navigate([para]);
    }

  }
  findTYPEDATA(Value) {
    if (!Value) {
      return this.TYPEDATA1[0];
    }
    return this.TYPEDATA1.find((n) => n.Value.toLowerCase() === Value.toLowerCase());
  }

  findTUNITDATA(Value) {
    if (!Value) {
      return this.UNITDATA1[0];
    }
    return this.UNITDATA1.find((n) => n.Symbol === Value);
  }

    // 修改数据定义弹框
  openUpdataModal(content, item) {
    this.addorupdate = '修改数据定义';
    this.dataModel.name = item.name;
    this.dataModel.updateId = item.id;
    this.dataModel.dataKey = item.dataKey;
    this.dataModel.dataMin = item.dataMin;
    this.dataModel.dataMax = item.dataMax;
    this.dataModel.resolution = item.resolution;
    this.dataModel.readOnly = item.readOnly;
    this.dataModel.describe = item.describe;
    this.dataModel.enums = item.enums;
    this.dataModel.BOOL.no = '';
    this.dataModel.BOOL.yes = '';
    if (item.dataType === 'Bool') {
      this.dataModel.BOOL.no = item.enums[0].name;
      this.dataModel.BOOL.yes = item.enums[1].name;
    }

    this.dataModel.dataType = this.findTYPEDATA(item.dataType);
    this.dataModel.unit = this.findTUNITDATA(item.unit);

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 修改服务定义弹框
  openUpdataServiceModal(content, item) {
    this.addorupdate = '修改服务定义';
    this.functionModel.updateId = item.id;
    this.functionModel.description = item.description;
    this.functionModel.identifier = item.identifier;
    this.functionModel.name = item.name;
    this.functionModel.synchrony = item.synchrony;
    this.functionModel.inputparam = item.params && item.params.length > 0 ? item.params.filter(ite => ite.isOutput === 0) : []; // 输入参数列表
    this.functionModel.outputparam = item.params && item.params.length > 0 ? item.params.filter(ite => ite.isOutput === 1) : []; // 输出参数列表
    this.AddParamModel.BOOL.no = '';
    this.AddParamModel.BOOL.yes = '';
    // if (item.dataType === 'Bool') {
    //   this.AddParamModel.BOOL.no = item.enums[0].name;
    //   this.AddParamModel.BOOL.yes = item.enums[1].name;
    // }

    this.dataModel.dataType = this.findTYPEDATA(item.dataType);
    this.dataModel.unit = this.findTUNITDATA(item.unit);

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 删除弹框
  openDelModal(content, item, flag) {
    this.delDataItemId = item.id;
    this.delDataItemFlag = flag;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除弹框
  openDelServiceModal(content, item) {
    this.delDataItemId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 新建数据定义弹框
  openNewModal(content) {
    this.addorupdate = '添加数据定义';
    this.dataModel.name = '';
    this.dataModel.dataKey = '';
    this.dataModel.dataMin = null;
    this.dataModel.dataMax = null;
    this.dataModel.resolution = null;
    this.dataModel.readOnly = false;
    this.dataModel.describe = '';
    this.dataModel.dataType = this.TYPEDATA1[0];
    this.dataModel.unit = this.UNITDATA1[0];

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 新建服务定义弹框
  openNewServiceModal(content) {
    this.addorupdate = '添加服务定义';
    this.functionModel.description = '';
    this.functionModel.identifier = '';
    this.functionModel.name = '';
    this.functionModel.synchrony = 1;
    this.functionModel.inputparam = []; // 输入参数列表
    this.functionModel.outputparam = []; // 输出参数列表
    this.AddParamModel.BOOL.no = '';
    this.AddParamModel.BOOL.yes = '';

    const modal = this.modalService.open(content, { windowClass: 'myCustomModalClass' });
    this.mr = modal;
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 添加参数弹框
  openParameterModal(content, isOutput) {
    this.AddParamModel.name = '';
    this.AddParamModel.dataKey = '';
    this.AddParamModel.dataType = this.TYPEDATA2[0];
    this.AddParamModel.unit = this.UNITDATA1[0];
    this.AddParamModel.dataMin = null;
    this.AddParamModel.dataMax = null;
    this.AddParamModel.resolution = null;
    this.AddParamModel.isOutput = isOutput;

    const modal = this.modalService.open(content );
    this.mr2 = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }




  // 分页
  pageChange() {}



}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}

