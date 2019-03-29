
import { Input, Component, OnInit, ɵConsole } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeviceService } from '../../../../service/device.service';
import { GradOverlar } from '../../../../service/grad.overlay';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { JwtHelperService } from '@auth0/angular-jwt';


// const URL = '/api/';
const URL = 'http://test1.siid.com.cn';


declare let BMap;

@Component({
  selector: 'app-devices',
  templateUrl: './device-home.component.html',
  styleUrls: ['./device-home.component.scss']
})
export class DeviceHomeComponent implements OnInit {
  closeResult: string;
  // 3.创建用来接收数据的变量
  map: any; // 地图对象
  cityList: any; // 城市列表
  deviceList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentRegion: any; // 当前区域
  currentAreaList: any; // 当前城市节点
  currentBlock: any; // // 当前城市街道
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  deviceshow = false; // 默认设备列表不显示
  visible = true; // 控制可视区域
  zoom: any; // 地图级数
  SouthWest: any; // 地图视图西南角
  NorthEast: any; // 地图视图东北角
  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点
  deviceslist = [];  // 设备列表

  page = 1; // 分页
  pageSize = 10; // 分页
  total = 0; // 分页
  page2 = 1; // 分页
  pageSize2 = 5; // 分页
  total3 = 0; // 分页
  deviceModels = [];  // 设备型号列表
  CustomerList = [];  // 客户列表
  deviceModels1 = [];
  currentModel: any; // 当前设备型号
  queryStr = ''; // 检索字符串
  queryStrPosi = ''; // 按区域显示的位置点，检索字符串
  device: any = {}; // 存储数据
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  posiListByRegion = []; // 按区域返回的位置点列表
  pagePosi = 1; // 分页
  pageSizePosi = 10;  // 分页
  total1 = 0;  // 分页
  showPosiTable = false; // 默认不显示表格内容，只显示表头
  bindedPosition: any; // 修改的设备
  addOrUpdate: any; // 新建/修改标识
  curModelIndex: any; // 当前设备型号标识
  devicePid: any; // 子设备
  parentDescription = ''; // 子设备
  fileUrl = ''; // 文件路径
  currentCustomer: any = {}; // 当前客户
  Customershow = false;
  customerId: null; // 平台客户
  curPosition: any;
  parentId = 0; // 父组件id

  showonprogresslist = false; // 默认不显示日志消息
  logList = [
    { id: 'DM-0011', name: '设备安装日志', url: 'home/device/devices/install-log' },
    { id: 'DM-0012', name: '设备上下线日志', url: 'home/device/devices/line-log' },
    // { id: 'DM-0013', name: '历史数据', url: 'home/device/devices/history'},
  ];
  // 上传文件
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  // 上传文件


  @Input()

  public alertsModal: Array<IAlert> = [];
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;

  constructor(public router: Router, private modalService: NgbModal,
    private deviceService: DeviceService,
    public jwtHelper: JwtHelperService,
    ) {
    const that = this;
    const url = `/api/device/import`;
    this.curModelIndex = 0; // 全选

    this.device.point = { lng: '', lat: '' };
    const token = localStorage.getItem('token');
    const tokenobj = this.jwtHelper.decodeToken(token);
    console.log(tokenobj);
    this.customerId = this.jwtHelper.decodeToken(token) && this.jwtHelper.decodeToken(token).customerid;
  // 上传文件
    this.uploader = new FileUploader({
      // url: `${URL}/api/device/import`,
      url: url,
      headers: [{ name: 'Authorization', value: `Bearer ${localStorage.getItem('token')}` }
       ],

      disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
      // formatDataFunction: async (item) => {
      //   console.log(item);
      //   // return new Promise((resolve, reject) => {
      //   //   resolve({
      //   //     name: item._file.name,
      //   //     length: item._file.size,
      //   //     contentType: item._file.type,
      //   //     fileUrl: that.fileUrl,
      //   //     date: new Date()
      //   //   });
      //   // });
      // }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => {
      this.response = res;
      if (typeof (res) === 'string') {
        const res1 = JSON.parse(res);
        if (res1.errors) {
          console.log(res1);
          const message = res1.errors[0].defaultMessage;
          that.alertsModal.push({
            id: 1,
            type: 'danger',
            message: `上传失败: ${message}！`,
          });
        } else {
          that.alertsModal.push({
            id: 1,
            type: 'success',
            message: '上传成功！',
          });
          that.backup = that.alertsModal.map((alert: IAlert) => Object.assign({}, alert));
        }

      }

    });
    // 上传文件
  }

  // 上传文件
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(this.uploader);

  }
  // 上传文件
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  // 上传文件
  public fileSelected(e: any): void {
    console.log(e);
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
    this.getCity();
    this.getAllDeviceModel();
    this.getDevicesList(this.page, this.pageSize);
    this.getCustomer();
  }

  // 下载文件
  domnload() {

    window.open(`${URL}/resources/template/device-template.xlsx`);
  }

  selectedFileOnChanged(event: any) {
    this.fileUrl = event.target.value;
  }
  // 属性页面
  goToZheRoute(para, ...id) {
    if (id) {
      this.router.navigate([para, { deviceId: id[0], modelId: id[1],  deviceName: id[2]}]);
    } else {
      this.router.navigate([para]);
    }

  }

  // 获取设备型号列表
  getAllDeviceModel() {
    const that = this;
    this.deviceService.getAllDeviceModel(0, 1, 20).subscribe({
      next: function (val) {
        that.deviceModels1 = val.items;
        that.deviceModels = val.items.map((item) => Object.assign({}, item));
        that.deviceModels.unshift({ id: 0, name: '不限' }); // 所有项
        that.currentModel = that.deviceModels[0]; // 默认显示“不限”
        that.curModelIndex = that.currentModel.id; // 标识
        that.device.model = that.deviceModels1[0];
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 获取设备分页
  getDevicesList(page, pageSize) {
    const that = this;
    this.deviceService.getAllDeviceByModel(this.queryStr, this.curModelIndex, page, pageSize, this.devicePid).subscribe({
      next: function (val) {
        that.deviceslist = val.items;
        that.total = val.total;
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 设备类型选择
  deviceTypeChange() {
    this.curModelIndex = this.currentModel.id;
    this.page = 1;
    this.getDevicesList(this.page, this.pageSize);
    // 显示特定型号的设备列表分页
  }
  // 检索按键点击事件
  execQuery() {
    this.page = 1;
    this.getDevicesList(this.page, this.pageSize);
  }
  // 子设备
  searchSubDevice(devicePid, description) {
    this.page = 1;
    this.devicePid = devicePid;
    this.parentDescription = description;
    console.log(this.devicePid);
    this.getDevicesList(this.page, this.pageSize);
  }

  descriptionClose() {
    this.devicePid = undefined;
    this.parentDescription = '';
    console.log(this.devicePid);
    this.getDevicesList(this.page, this.pageSize);
  }

  // 批量导出
  output() {
    const that = this;
    this.deviceService.getAllDeviceByModel(this.queryStr, this.curModelIndex, -1, -1, this.devicePid).subscribe({
      next: function (val) {
        // that.deviceslist = val.items;
        // that.total = val.total;
        console.log(val);
        const a = [];
        a.push(['设备名称', '设备描述', 'SECRET', 'KEY', '设备型号', '位置编号', '客户编号']);
        val.items.map(item => {
          a.push([item.name, item.description, item.secret, item.key, item.modelName, item.positionNumber, item.customerCode ]);
        });
        that.daochu(a);
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 导出
  daochu(data) {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    // const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');

    console.log(wb);
    /* save to file */
    XLSX.writeFile(wb, 'device.xlsx');
  }
  // 导出表格
  exportTable() {
    const blob = new Blob([document.getElementById('exportableTable').innerHTML], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    saveAs(blob, 'device.xlsx');
  }

  // 分页
  pageChange() {
    this.getDevicesList(this.page, this.pageSize);
  }

  // 分页
  pageChange2() {
    this.getCustomer();
  }
  pageChangePosi() {
    this.getPosiByRegionId(this.currentRegion.id, this.pagePosi, this.pageSizePosi);
  }

  // 分页获取道路
  getCustomer() {
    const that = this;

    this.deviceService.getCustomer(this.page2, this.pageSize2, '')
      .subscribe({
        next: function (val) {
          that.CustomerList = val.items;
          that.CustomerList.unshift({ 'name': '平台用户', code: '' }); // 添加平台用户
          that.total3 = val.total;
          console.log(that.total3);
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 选择客户
  selecteCustomer(item) {
    this.currentCustomer = item;
    this.Customershow = false;
    this.getCity(item.id);
  }

  // 显示客户
  showCustomer() {
    this.Customershow = true;
  }

  // 离开客户
  CustomerlistMouseleave() {
    this.Customershow = false;
  }

  // 批量导入弹窗
  openAddSurveys(content) {
    const that = this;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }


  // 新建设备弹框
  openNewSurvey(content) {
    this.addOrUpdate = '新建设备';
    // this.alertsModal = [];
    this.device.name = '';
    this.device.model = this.deviceModels1[0];
    this.device.descr = '';
    // this.device.bindedPosi = this.bindedPosition;
    this.bindedPosition = null;
    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.mr = modal;
    this.addBaiduMap();

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.showPosiTable = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.showPosiTable = false;
    });
  }
  addorUpdate(addOrUpdate) {
    if (addOrUpdate === '新建设备') {
      this.addDevice();
    } else {
      this.device.modelId = this.device.model.id; // 关闭模态框时同步modelId以便更新。device.model为双向绑定的设备类型
      this.updataDevice();
    }
  }

  // 详情
  // 判断数组中是否存在值
  getture(str) {
    const Authorities = JSON.parse(localStorage.getItem('Authorities'));
    const Auth = Authorities ? Authorities.Authorities : [];
    let res = false;
    if (str === 'HP-000') {
      res = true;
      return res;
    }
    Auth.map(item => {
      if (item === str) {
        res = true;
        return res;
      }
    });
    return res;
  }

  // 新增设备
  addDevice() {
    const that = this;
    console.log(this.device);
    const body = {
      'name': this.device.name,
      'modelId': this.device.model.id,
      'description': this.device.descr,
      'positionId': this.bindedPosition ? this.bindedPosition.id : null,
      'point': {
        'lat': this.bindedPosition && this.bindedPosition.point.lat,
        'lng': this.bindedPosition && this.bindedPosition.point.lng
      },
      'customerId': this.currentCustomer.id || this.customerId,
      'parentId': this.currentCustomer.parentId
    };

    this.deviceService.addNewDevice(body).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: `新建成功`,
        });
        that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
        that.mr.close();
      },
      complete: function () {
        that.getDevicesList(that.page, that.pageSize);
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
  // 修改设备弹框
  openUpdataDevice(content, item, i) {
    this.queryStrPosi = '';
    this.addOrUpdate = '更新设备';
    const that = this;
    // this.alertsModal = [];
    this.getPosiById(item.positionId); // device.positionId -> position. (设备->位置点)
    console.log(this.device.parentId);
    this.device.updateId = item.id;
    this.device.name = item.name;
    this.device.point = item.point;
    this.currentCustomer.id = item.customerId; // 当前客户
    this.currentCustomer.name = item.customerName; // 当前客户
    const id = item.modelId;
    this.device.descr = item.description;
    // 传入当前设备的类型
    for (let index = 0; index < this.deviceModels1.length; index++) {
      const element = that.deviceModels1[index];
      if (id === element.id) {
        that.device.model = that.deviceModels1[index]; // 设备型号为传入的item的型号
        break;
      }
    }
    const modal = this.modalService.open(content, { windowClass: 'ex-lg-modal' });
    this.mr = modal;
    this.addBaiduMap();
    // this.getPositionById(item.positionId);
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
    // 获取位置信息
  getPositionById(id) {
    this.deviceService.getPositionById(id).subscribe({
      next: function (val) {
        console.log(val);
      }
    });
  }
  // 修改设备信息
  updataDevice() {
    const that = this;

    const body = {
      'id': this.device.updateId,
      'name': this.device.name,
      'modelId': this.device.model.id,
      'description': this.device.descr,
      'positionId': this.bindedPosition ? this.bindedPosition.id : null,
      'point': {
        'lat': this.bindedPosition && this.bindedPosition.point.lat,
        'lng': this.bindedPosition && this.bindedPosition.point.lng
      },
      'customerId': this.currentCustomer.id || this.customerId,
    };
    this.deviceService.updateDevice(body).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '修改成功！',
        });
        that.mr.close();
      },
      complete: function () {
        that.getDevicesList(that.page, that.pageSize);
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
  // 删除设备弹框
  openDelDevice(content, item) {
    this.device.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
  }
  // 删除设备规则
  closeDevice($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delDevice();
    }
    this.mr.close();
  }
  // 删除设备-接口处
  delDevice() {
    const that = this;
    const id = this.device.itemDelId;
    let flag = false;
    const pages = (this.total + this.pageSize - 1) / this.pageSize;
    if (this.page >= pages && this.deviceslist.length === 1) {
      flag = true;
    }
    this.deviceService.delDevice(id).subscribe({
      next: function (val) {
        that.alerts.push({
          id: 1,
          type: 'success',
          message: '删除成功！',
        });
      },
      complete: function () {
        if (flag) {
          that.page = that.page - 1;
          that.getDevicesList(that.page, that.pageSize);
        } else {
          that.getDevicesList(that.page, that.pageSize);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // position表点击事件
  bindPosition(position) {
    this.curPosition = position;
    this.bindedPosition = position;
    this.map.clearOverlays();
    const point = new BMap.Point(position.point.lng, position.point.lat);
    this.map.centerAndZoom(point, 18);
    const mySquare = new GradOverlar(point, 50, 'tag-bule');
    this.map.addOverlay(mySquare);
  }


  addBaiduMap() {
    const map = this.map = new BMap.Map('survey_map', {
      enableMapClick: true,
    }); // 创建地图实例
    const point = new BMap.Point(113.922329, 22.49656); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 17); // 设置中心和地图显示级别
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

  // 根据设备型号id返回设备型号名称
  modelName(modelId) {
    let modelName = null;
    this.deviceModels.map((item, i) => {
      if (item.id === modelId) {
        modelName = item.name;
      }
    });
    // console.log(modelName);
    return modelName;
  }

  // 根据设备型号id返回设备型号名称
  isGateway(modelId) {
    let flag = false;
    this.deviceModels.map((item, i) => {
      if (item.id === modelId && item.isGateway) {
        flag = true;
      }
    });
    // console.log(flag);
    return flag;
  }

  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
  }

  // 根据positionId返回指定位置点
  getPosiById(id) {
    if (!id) {
      return;
    }
    const that = this;
    let curPosition;
    this.deviceService.getPosiById(id).subscribe({
      next: function (val) {
        curPosition = val;
        that.bindedPosition = val;
        that.updatePosiRegion(val.regionId);
      },
      complete: function () {

        that.bindPosition(curPosition);
        that.getPosiByRegionId(curPosition.regionId, 1, that.pageSizePosi);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 传入'修改设备位置点所在区域'到模态框
  updatePosiRegion(regionId) {
    const that = this;

    const region_id = regionId.toString().slice(0, 4); // 当前城市id
    console.log(region_id);

    this.node = null; // 用于递归查询JSON树 父子节点 currentRegion
    this.currentCity = this.getNode(this.cityList, region_id); // 当前城市
    console.log(this.currentCity);
    this.currentAreaList = this.currentCity ? this.currentCity.children : []; // 当前城市下的区域列表区域
    const area_id = regionId; // 当前区域id
    this.node = null; // 用于递归查询JSON树 父子节点
    this.currentRegion = this.getNode(this.cityList, area_id); // 当前区域
  }

  getCity(...cusid) {
    const that = this;
    this.deviceService.getZoneDefault(cusid).subscribe({
      next: function (val) {
        if (!val) {
          that.cityList = [];
          that.currentCity = null;
          that.currentAreaList = [];
          that.currentRegion = null;
          that.alertsModal.push({
            id: 1,
            type: 'danger',
            message: `该客户安装区域为空！`,
          });
          return;
        }
        that.cityList = val.regions;
        that.node = null; // 用于递归查询JSON树 父子节点
        that.currentCity = that.getNode(val.regions, val.regions[0].children[0].id); // 当前城市
        that.currentAreaList = that.currentCity.children; // 当前城市下的区域列表
        that.currentRegion = that.currentAreaList && that.currentAreaList[0]
          && that.currentAreaList[0].children && that.currentAreaList[0].children[0]; // 当前区域
      },
      complete: function () {

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
        zone = 17;
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

    return that.node;
  }
  getPoint(baiduMap, city) {
    const zoom = this.zoom = this.switchZone(city.level);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);

  }

  // 选择区域
  // 选择城市
  selecteCity(city) {
    this.device.installZoneId = city.installZoneId; // 安装区域
    this.device.point = { lng: '', lat: '' };
    this.currentCity = city;
    this.currentAreaList = city.children;
    console.log(city);
    this.currentRegion = null;
    this.node = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.pagePosi = 1;
    this.getPosiByRegionId(this.currentCity.id, this.pagePosi, this.pageSizePosi);
  }

  // 街道点击事件
  selecteblock(block) {
    this.queryStrPosi = '';
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
    this.currentRegion = block;
    this.device.point = { lng: '', lat: '' };
    this.pagePosi = 1;
    this.getPosiByRegionId(this.currentRegion.id, this.pagePosi, this.pageSizePosi);
  }
  // 新建/修改设备中检索点击事件
  execQueryPosi() {
    this.pagePosi = 1;
    this.getPosiByRegionId(this.currentRegion.id, this.pagePosi, this.pageSizePosi);
  }
  // 通过安装区域和检索字符串获取位置点
  getPosiByRegionId(regionId, page, pageSize) {
    const that = this;
    this.showPosiTable = true;
    this.deviceService.getAllPosiByRegionId(this.queryStrPosi, regionId, page, pageSize).subscribe({
      next: function (val) {
        that.posiListByRegion = val.items;
        that.total1 = val.total;
      },
      complete: function () { },
      error: function (error) {
        console.log(error);
      }
    });
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

  // 显示 日志 消息
   showOnprogressList() {
    this.showonprogresslist = true;
  }
  // 离开 日志 消息
  messageListMouseleave_2() {
    this.showonprogresslist = false;
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: 	devices.component.ts
@time: 2018 / 7 / 2 17: 18

*/
