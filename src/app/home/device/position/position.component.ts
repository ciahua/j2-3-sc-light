import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../../../service/position.service';
import { GradOverlar } from '../../../service/grad.overlay';
import { JwtHelperService } from '@auth0/angular-jwt';

// baidu map
declare let BMap;

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})

export class PositionComponent implements OnInit {
  @ViewChild('map1') map_container: ElementRef;
  model: any = {}; // 存储数据
  closeResult: string;
  map: any; // 地图对象
  deviceList = []; // 设备列表
  deviceTypes = []; // 设备列表
  currentType: any; // 当前搜索设备类别

  cityList: any; // 城市列表
  defaultZone: any; // 默认城市
  currentCity: any; // 当前城市
  currentRegion: any; // 当前区域
  currentAreaList: any; // 当前城市节点区域
  currentBlockList: any; // // 当前城市街道列表
  areashow = false; // 默认区域列表不显示
  cityshow = false; // 默认区域列表不显示
  wayshow = false; // 默认道路列表不显示
  Customershow = false; // 默认客户列表不显示

  visible = true; // 控制可视区域
  zoom: any; // 地图级数
  parentNode = null; // 用于递归查询JSON树 父子节点
  node = null; // 用于递归查询JSON树 父子节点---当前城市
  positionListItems = []; // 位置列表
  roadList = []; // 道路列表
  CustomerList = []; // CustomerList列表
  positionList: any; // 位置列表
  total = 0; // 分页
  page = 1; // 分页
  pagesize = 10; // 分页
  total1 = 0; // 分页
  page1 = 1; // 分页
  pageSize1 = 10; // 分页
  total2 = 0; // 分页
  page2 = 1; // 分页
  pageSize2 = 5; // 分页
  queryStr = '';
  queryStr1 = '';
  public mr: NgbModalRef; // 当前弹框
  modelData = {
    title: '删除',
    body: 'hh',
  };
  errorMess = []; // 经纬度错误消息
  currentWay: any = {}; // 当前道路

  addOrupdata = '新建位置';
  currentCustomer: any = {}; // 当前客户
  customerId: null; // 平台客户
  address = '';

  @Input()
  public alerts: Array<IAlert> = [];
  public alertsModal: Array<IAlert> = [];
  private backup: Array<IAlert>;

  constructor(private modalService: NgbModal, private positionService: PositionService,
    public jwtHelper: JwtHelperService,
    ) {

    this.model.point = {lng: '', lat: ''};
    const token = localStorage.getItem('token');
    const tokenobj = this.jwtHelper.decodeToken(token);
    this.customerId = this.jwtHelper.decodeToken(token).customerid;

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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.getCity();
    this.getPositionType();
    this.getPosition(0, this.page, this.pagesize);
    this.getRoads();
    this.getCustomer();
  }

  adGeocoder(name) {
    const myGeo = new BMap.Geocoder();
    const that = this;
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(name, function (point) {
      if (point) {
        that.map.centerAndZoom(point, 7);
        that.map.addOverlay(new BMap.Marker(point));
        that.model.center = {};
        that.model.center.lng = point.lng;
        that.model.center.lat = point.lat;
      } else {
        alert('您选择地址没有解析到结果!');
      }
    }, '');
  }
  // 选择道路
  selecteWay(item) {
    this.currentWay = item;
    this.wayshow = false;
    this.model.wayId = item.id;
  }

  // 选择客户
  selecteCustomer(item) {
    this.currentCustomer = item;
    this.Customershow = false;
    this.model.CustomerId = item.id;
    this.getCity(item.id);
  }
  // 检索按键点击事件
  execQuery() {
    this.page = 1;
    this.getPosition(this.currentType.id, 1, this.pagesize);
  }

  changeName(modelId) {
    let modelName;
    this.deviceTypes.map((item, i) => {
      if (item.id === modelId) {
        modelName = item.name;
      }
    });
    // console.log(modelName);
    return modelName;
  }

  deviceTypeChange() {
    this.page = 1;
    this.getPosition(this.currentType.id, this.page, this.pagesize);
  }

  // 分页获取道路
  getRoads() {
    const that = this;

    this.positionService.getRoads(this.page1, this.pageSize1, '')
      .subscribe({
        next: function (val) {
          that.roadList = val.items;
          that.total1 = val.total;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 分页获取客户
  getCustomer() {
    const that = this;

    this.positionService.getCustomer(this.page2, this.pageSize2, '')
      .subscribe({
        next: function (val) {
          that.CustomerList = val.items;
          that.CustomerList.unshift({'name': '平台用户', code: ''}); // 添加平台用户
          that.total2 = val.total;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 新建位置弹框
  openNewPosition(content) {

    this.addOrupdata = '新增位置';
    this.errorMess = [];
    this.model.name = ''; // name
    this.model.number = ''; // number
    this.currentCustomer = {};
    this.currentAreaList = this.currentCity && this.currentCity.children; // 当前城市下的区域列表
    console.log(this.currentAreaList);
    this.currentRegion = this.currentAreaList && this.currentAreaList[0]
    && this.currentAreaList[0].children && this.currentAreaList[0].children[0]; // 当前区域
    this.model.device = this.deviceList[0]; // 类型
    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    this.addBaiduMap();
    const point = new BMap.Point(114.062769, 22.477677); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    this.bindPosition(point);
    this.model.point = { lng: '', lat: '' }; // 坐标
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  // 修改位置弹框
  openUpdataPosi(content, item, i) {
    this.addOrupdata = '修改位置';
    this.errorMess = [];
    this.model.updataId = item.id;
    this.model.installZoneId = item.installZoneId; // 安装区域
    this.model.name = item.name; // name
    this.model.number = item.number; // number
    this.model.point = item.point; // point

    const id = item.type; // 类型
    for (let index = 0; index < this.deviceList.length; index++) {
      const element = this.deviceList[index];
      if (id === element.id) {
        this.model.device = this.deviceList[index];
      }
    }

    let region_id; // 当前城市id
    region_id = item.regionId.toString().slice(0, 4);
    console.log(region_id);

    this.node = null; // 用于递归查询JSON树 父子节点 currentArea
    this.currentCity = this.getNode(this.cityList, region_id); // 当前城市
    console.log(this.currentCity);
    this.currentAreaList = this.currentCity ? this.currentCity.children : []; // 当前城市下的区域列表
    const area_id = item.regionId; // 当前区域id
    this.node = null; // 用于递归查询JSON树 父子节点
    this.currentRegion = this.getNode(this.cityList, area_id); // 当前区域
    this.currentWay.id = item.wayId; // 当前道路
    this.currentWay.wayName = item.wayName; // 当前道路

    this.currentCustomer.id = item.customerId; // 当前客户
    this.currentCustomer.name = item.customerName; // 当前客户

    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    this.addBaiduMap();
    this.bindPosition(item.point);

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  // position表点击事件
  bindPosition(point1) {
    this.map.clearOverlays();
    const point = new BMap.Point(point1.lng, point1.lat);
    this.map.centerAndZoom(point, 19); // 设置中心和地图显示级别
    const mySquare = new GradOverlar(point, 50, 'tag-bule');
    this.map.addOverlay(mySquare);
  }




  addorupdata() {
    if (this.addOrupdata === '新增位置') {
      this.setPosition();
    } else {
      this.updataPosition();
    }
  }


  // 新增位置信息
  setPosition() {
    this.typeofPoint();
    if (this.errorMess[0] === '无错') {
      const that = this;
      const body = {
        'installZoneId': this.model.installZoneId,
        'name': this.model.name,
        'number': this.model.number,
        'point': this.model.point,
        'regionId': this.currentRegion.id,
        'type': this.model.device.id,
        'wayId': this.currentWay.wayId,
        'customerId': this.currentCustomer.id || this.customerId,
      };

      this.positionService.setPosition(body).subscribe({
        next: function (val) {
          that.alerts.push({
            id: 1,
            type: 'success',
            message: '新建成功！',
          });
          that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
          that.mr.close();
        },
        complete: function () {
          that.getPosition(that.currentType.id, that.page, that.pagesize);
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
    } else {
      this.alertsModal.push({
        id: 1,
        type: 'danger',
        message: '请输入正确的经纬度！',
      });
    }

  }

  // 修改位置信息
  updataPosition() {
    this.typeofPoint();
    if (this.errorMess[0] === '无错') {
          const that = this;

          const body = {
            'id': this.model.updataId,
            'installZoneId': this.model.installZoneId,
            'name': this.model.name,
            'number': this.model.number,
            'point': this.model.point,
            'regionId': this.currentRegion && this.currentRegion.id,
            'type': this.model.device.id,
            'wayId': this.currentWay.wayId,
            'customerId': this.currentCustomer.id || this.customerId,
          };

          this.positionService.updataPosition(body).subscribe({
            next: function (val) {
              that.alerts.push({
                id: 1,
                type: 'success',
                message: '修改成功！',
              });
              that.backup = that.alerts.map((alert: IAlert) => Object.assign({}, alert));
              that.mr.close();
            },
            complete: function () {
              that.getPosition(that.currentType.id, that.page, that.pagesize);
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
    } else {
      this.alertsModal.push({
        id: 1,
        type: 'danger',
        message: '请输入正确的经纬度！',
      });
    }

  }

  // 删除位置弹框
  openDelPosi(content, item, i) {
    this.model.itemDelId = item.id;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除位置规则
  closePosition($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delPosition();
    }
    this.mr.close();
  }

  // 删除位置-接口处
  delPosition() {
    const that = this;
    const id = this.model.itemDelId;
    let flag = false;
    const pages = (this.total + this.pagesize - 1) / this.pagesize;
    if (this.page >= pages && this.positionListItems.length === 1) {
      flag = true;
    }
    this.positionService.delPosition(id).subscribe({
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
          that.getPosition(that.currentType.id, that.page, that.pagesize);
        } else {
          that.getPosition(that.currentType.id, that.page, that.pagesize);
        }
      },
      error: function (error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `修改失败: ${message}！`,
        });
        console.log(error);
      }
    });
  }

  // 获取位置
  getPosition(type: number, page: number, pagesize: number) {
    const that = this;
    this.positionService.getPosition(this.queryStr, type, page, pagesize).subscribe({
      next: function (val) {
        that.positionList = val;
        that.total = val.total;
        that.positionListItems = val.items;
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }



  // 分页
  pageChange() {
    this.getPosition(this.currentType.id, this.page, this.pagesize);
  }

  // 分页
  pageChange1() {
    this.getRoads();
  }

  // 分页
  pageChange2() {
    this.getCustomer();
  }

  // 获取位置类型列表
  getPositionType() {
    const that = this;
    this.positionService.getPositionType().subscribe({
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

  // 选择设备
  deviceChange() {
    console.log(this.model.device);
  }

  // 获取城市列表
  getCity(...cusid) {
    const that = this;
    this.positionService.getZoneDefault(cusid).subscribe({
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


  openAddPositions(content) {
    this.modalService.open(content, { windowClass: 'md-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });

  }



  // 添加地图实例
  addBaiduMap() {
    const map = this.map = new BMap.Map('position_map', {
      enableMapClick: true,
      // minZoom: 11
    }); // 创建地图实例
    const point = new BMap.Point(114.062769 , 22.477677); // 坐标可以通过百度地图坐标拾取器获取 --万融大厦
    map.centerAndZoom(point, 7); // 设置中心和地图显示级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setMapStyle({ style: 'normal' });
    this.mapClickOff(map);
  }

  // 监控-点击地图事件
  mapClickOff(baiduMap) {
    const that = this;
    baiduMap.addEventListener('click', function (e) {
      that.model.point = e.point;
    });
  }

  typeofPoint() {
    const that = this;
    this.errorMess = [];
    const str1 = '纬度';
    const str2 = '经度';
    this.validPoint(this.model.point.lat, str1);
    this.validPoint(this.model.point.lng, str2);
    if (this.errorMess.length <= 0) {
      that.errorMess.push('无错');
    }
  }
  // 验证坐标输入合法性
  validPoint(lat, str) {
    let maxValue;
    if (str === '纬度') {
      maxValue = 90;
    } else {
      maxValue = 180;
    }
    const that = this;
    let errorMes = ''; // 错误信息提示
    const latNum = Number(lat);
    const latStr = latNum.toString();

    if (lat && latStr === 'NaN') {
      errorMes = str + '数错误！';
      // console.log(errorMes);
    } else if (lat && latStr !== 'NaN') {
        const pointArray = latStr.split('.');
        if (Number(pointArray[0]) >= -maxValue && Number(pointArray[0]) <= maxValue) {
            if (pointArray[1].length > 6) {
                errorMes = str + '取小数点后6位！';
                const term = pointArray[1].slice(0, 6);
                pointArray[1] = term;
            }
            if (str === '纬度') {
              that.model.point.lat = pointArray[0] + '.' + pointArray[1];
            } else {
              that.model.point.lng = pointArray[0] + '.' + pointArray[1];
            }
        } else {
            errorMes = str + '超出范围！';
        }

    }
    errorMes === '' ? errorMes = '' : this.errorMess.push(errorMes);

  }


  // 搜索Enter事件
  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.execQuery();
    }
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

    // 创建地址解析器实例
    const zoom = this.zoom = this.switchZone(city.level);
    const pt = city.center;
    const point = new BMap.Point(pt.lng, pt.lat);
    baiduMap.centerAndZoom(point, zoom);
  }
  // 选择区域
  // 选择城市
  selecteCity(city, i) {
    this.model.installZoneId = city.installZoneId; // 安装区域
    this.model.point = { lng: '', lat: '' };
    this.currentCity = city;
    this.getPoint(this.map, city);  // 解析地址- 设置中心和地图显示级别
    this.currentAreaList = city.children;
    this.currentRegion = null;
  }

  // 选择街道
  selecteblock(block) {
    this.currentRegion = block;
    this.model.installZoneId = block.installZoneId; // 安装区域
    console.log(block);
    this.model.point = { lng: '', lat: '' };
    this.getPoint(this.map, block);  // 解析地址- 设置中心和地图显示级别
  }

  nolimt() {
    this.model.installZoneId = this.currentCity.installZoneId; // 安装区域
    this.currentRegion.id = this.currentCity.id;
    this.currentRegion = {
      name: '不限'
    };
  }

  // 显示区域
  showArea() {
    this.areashow = true;
  }
  // 显示城市
  showCiyt() {
    this.cityshow = true;
  }

  // 显示道路
  showWay() {
    this.wayshow = true;
  }

  // 显示客户
  showCustomer() {
    this.Customershow = true;
  }
  // 选择区域
  arealistMouseover(area) {
    this.currentBlockList = area.children;
  }
  // 离开区域
  arealistMouseleave() {
    this.areashow = false;
    this.currentBlockList = null;
  }
  // 离开城市
  citylistMouseleave() {
    this.cityshow = false;
  }
  // 离开道路
  waylistMouseleave() {
    this.wayshow = false;
  }
  // 离开客户
  CustomerlistMouseleave() {
    this.Customershow = false;
  }
  arealistMouseNone() {
    this.areashow = true;
    this.currentBlockList = null;
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
