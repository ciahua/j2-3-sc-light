import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AirmonitorService } from '../../../../service/airmonitor.service';
import { saveAs } from 'file-saver';

const now = new Date();

@Component({
  selector: 'app-airreport',
  templateUrl: './theairreport.component.html',
  styleUrls: ['./theairreport.component.scss']
})
export class TheairreportComponent implements OnInit {
  currentdevice: any; // 当前设备
  devicelist: any;  // 设备集合
  NorthEast: any; // 坐标点
  SouthWest: any; // 坐标点
  closeResult: string;
  historydatalist = []; // 指定设备的历史数据集合
  historydatalistItems = [];
  deviceIndx = 0;
  total: any;

  page = 1;

  startDate: NgbDateStruct =
    { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 23, minute: 59, second: 59 };
  seconds = true;
  fromdate: any; // 开始日期
  todate: any; // 结束日期
  fields = [  // 统计字段名称
    { id: 1, name: 'pm25', type: 'PM2.5' },
    { id: 2, name: 'pm10', type: 'PM10' },
    { id: 3, name: 'tvoc', type: 'TVOC' },
    { id: 3, name: 'temperature', type: '温度' },
    { id: 3, name: 'humidity', type: '湿度' },
  ];

  aggs = [ // 统计方式
    { id: 1, name: 'avg', type: '平均值' },
    { id: 2, name: 'max', type: '最大值' },
    { id: 3, name: 'min', type: '最小值' },
  ];
  intervals = [ // 时间间隔
    { id: 1, name: 'm', type: '分钟' },
    { id: 2, name: 'h', type: '小时' },
    { id: 3, name: 'd', type: '天' },
  ];

  dashtrue = false; // 可视化图表


  constructor( public router: Router,
    private airmonitorService: AirmonitorService, config: NgbTimepickerConfig) {
    // 获取坐标范围
    this.NorthEast = JSON.parse(localStorage.getItem('NE'));
    this.SouthWest = JSON.parse(localStorage.getItem('SW'));

    config.spinners = false; // 时间控制

  }

  ngOnInit() {
    this.getDevices();
  }

  // 根据当前坐标范围，获取所有在内的设备
  getDevices() {
    const that = this;

    this.airmonitorService.getAirDevice(this.NorthEast, this.SouthWest).subscribe({
      next: function (val) {
        that.devicelist = val;
        that.currentdevice = val[0];
      },
      complete: function () {
        that.getHistoryData();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 点击左侧监测点
  selectPoint(index, device) {
    this.currentdevice = device;
    this.deviceIndx = index;
    this.getHistoryData();
  }
  // 获取指定设备的历史数据记录
  getHistoryData() {
    const that = this;
    const smonth = this.startDate.month.toString().length > 1 ? this.startDate.month.toString() : `0${this.startDate.month.toString()}`;
    const sday = this.startDate.day.toString().length > 1 ? this.startDate.day.toString() : `0${this.startDate.day.toString()}`;

    const shour = this.startTime.hour.toString().length > 1 ? this.startTime.hour.toString() : `0${this.startTime.hour.toString()}`;
    const sminute = this.startTime.minute.toString().length > 1 ? this.startTime.minute.toString() : `0${this.startTime.minute.toString()}`;

    const emonth = this.endDate.month.toString().length > 1 ? this.endDate.month.toString() : `0${this.endDate.month.toString()}`;
    const eday = this.endDate.day.toString().length > 1 ? this.endDate.day.toString() : `0${this.endDate.day.toString()}`;

    const ehour = this.endTime.hour.toString().length > 1 ? this.endTime.hour.toString() : `0${this.endTime.hour.toString()}`;
    const eminute = this.endTime.minute.toString().length > 1 ? this.endTime.minute.toString() : `0${this.endTime.minute.toString()}`;

    const fromdate = this.fromdate =
      `${this.startDate.year}-${smonth}-${sday}T${shour}:${sminute}`;

    const todate = this.todate = `${this.endDate.year}-${emonth}-${eday}T${ehour}:${eminute}`;
    const page = this.page;
    const pageSize = 10;
    this.airmonitorService.getHistoryData(this.currentdevice.id, fromdate, todate, page, pageSize).subscribe({
      next: function (val) {
        that.historydatalist = val;
        that.historydatalistItems = val.items;
        that.total = val.total;
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 分页获取数据
  pageChange() {
    this.getHistoryData();
  }

  // 搜索
  dataSearch() {
    this.page = 1;
    this.getHistoryData();
  }

  // 本地存储数据
  getStatistics() {
    const id = this.currentdevice.id;
    const agg = this.aggs[0].name;
    const fromdate = this.fromdate;
    const todate = this.todate;
    const interval = this.intervals[0].name;
    localStorage.setItem('dash_data', JSON.stringify({ id: id, agg, fromdate, todate, interval}));
  }



  // 路由跳转
  jumpHandle(url) {
    this.router.navigate([url]);
  }
  // 获取当前设备的离线状态
  getdevicestatus(val) {
    if (val.offline) {
      return '离线';
    } else {
      return '在线';
    }
  }

  // 导出表格
  exportTable() {
    const blob = new Blob([document.getElementById('exportableTable').innerHTML], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    saveAs(blob, 'test.xls');
  }


  // 生成图表
  openGenerateTables() {
    const that = this;
    this.dashtrue = true;
    this.getStatistics();
    this.jumpHandle('home/application/air/dashboard');
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
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: airreport.component.ts
@ introduction: 监测大数据
@ln:196
@time: 2018 / 7 / 2 17: 18

*/
