import { Component, OnInit, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons , NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  model: any = {};
  closeResult: string;
  productList: any;
  productListItems = [];
  total: number; // 分页
  page: number;
  pagesize = 10;
  type = 0;
  deviceList = []; // 设备列表
  deviceTypes = []; // 设备列表
  currentType: any; // 当前搜索设备类别
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  queryStr: any;

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];

  private backup: Array<IAlert>;

  constructor(private modalService: NgbModal,  private productService: ProductService) {
    this.page = 1;
    this.queryStr = '';
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  public closeAlertModal(alert: IAlert) {
    const index: number = this.alertsModal.indexOf(alert);
    this.alertsModal.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
    this.getDevice();
    this.getModel(0, this.page, this.pagesize);
  }

  // 产品关键词检索 点击事件
  execQuery() {
    this.page = 1;
    this.getModel(this.currentType.id, 1, this.pagesize);
  }
    // 获取设备型号
  getModel(type: number, page: number, pagesize: number) {
    const that = this;
    this.productService.getModel(this.queryStr, type, page, pagesize).subscribe({
      next: function (val) {
        that.productList = val;
        that.total = val.total;
        that.productListItems = val.items;

      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  // fenye
  pageChange() {
    this.getModel(this.currentType.id, this.page, this.pagesize);
  }
  // 获取设备列表
  getDevice() {
    const that = this;
    this.productService.getDevice().subscribe({
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


  deviceTypeChange() {
    this.getModel(this.currentType.id, this.page, this.pagesize);
  }
  changeName(modelId) {
    let modelName;
    this.deviceTypes.map((item, i) => {
      if (item.id === modelId) {
        modelName = item.name;
      }
    });
    return modelName;
  }

  // 打开心建产品弹框
  openNewProduct(content) {
    this.model.name = ''; // name
    this.model.description = ''; // description
    this.model.device = this.deviceList[0]; // 类型
    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 添加设备型号
  setModel() {
    const that = this;
    const name = this.model.name;
    const description = this.model.description;
    const type = this.model.device.id;
    const isGateway = type === 1 ? true : false;
    this.productService.setModel(name, description, type, isGateway).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '新建成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getModel(that.currentType.id, that.page, that.pagesize);
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

  // 修改产品型号
  openUpdataModal(content, item) {
    const that = this;
    this.model.name = item.name; // name
    this.model.description = item.description; // description
    this.model.updateItemId = item.id; // id
    const id = item.type; // 类型
    for (let index = 0; index < this.deviceList.length; index++) {
      const element = this.deviceList[index];
      if (id === element.id) {
        that.model.device = this.deviceList[index];
      }
    }

    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  // 修改设备型号
  updateModel() {

    const that = this;
    const id = this.model.updateItemId;
    const name = this.model.name;
    const description = this.model.description;
    const type = this.model.device.id;
    const isGateway = type === 1 ? true : false;
    this.productService.updateModel(id, name, description, type, isGateway).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getModel(that.currentType.id, that.page, that.pagesize);
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

  // 删除设备型号弹框
  openDelModal(content, item) {
    const that = this;
    this.model.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除设备型号
  closeModal($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delModal();
    }
    this.mr.close();
  }

  // 删除设备型号-接口处
  delModal() {
    const that = this;
    const id = this.model.itemDelId;
    let flag = false;
    const pages = (this.total + this.pagesize - 1) / this.pagesize;
    if (this.page >= pages && this.productListItems.length === 1) {
      flag = true;
    }
    this.productService.delModel(id).subscribe({
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
          that.getModel(that.currentType.id, that.page, that.pagesize);
        } else {
          that.getModel(that.currentType.id, that.page, that.pagesize);
        }
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `修改失败: ${message}`,
        });
      }
    });
  }

  openAddParams(content) {
    const that = this;
    this.modalService.open(content, { windowClass: 'md-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
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
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
