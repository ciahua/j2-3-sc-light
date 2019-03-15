import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DeviceHistoryService } from '../../../../../service/device-history.service';
// baidu map
declare let echarts;

const now = new Date();
@Component({
  selector: 'app-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.scss']
})
export class HistoryDataComponent implements OnInit {
  deviceId: any; // 设备id
  dataKey: string; // 设备属性
  page = 1; // 分页
  pageSize = 10; // 分页
  total = 0; // 分页
  historydatalist = []; // 数据列表
  startDate: NgbDateStruct =
    { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期

  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 23, minute: 59, second: 59 };

  fromdate: any; // 开始日期
  todate: any; // 结束日期



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
  dashData: any;
  agg: any;
  interval: any;

  constructor(private routerinfo: ActivatedRoute,
    public router: Router,
    private deviceHistoryService: DeviceHistoryService,
    ) {
    this.agg = this.aggs[0];
    this.interval = this.intervals[0];
  }
  flag = 1;
  ngOnInit() {
    this.deviceId = this.routerinfo.snapshot.params.deviceId;
    this.dataKey = this.routerinfo.snapshot.params.dataKey;
    console.log(this.deviceId);
    console.log(this.dataKey);
    this.getHistoryData();
  }
  // tab切换
  goToChange() {
    if (this.flag === 1) {
      this.flag = 2;
      this.getStatistics();
    } else {
      this.flag = 1;
    }
  }
  aggsChange() {
    this.getStatistics();
  }

  // 获取历史数据的统计值
  getStatistics() {
    // id: number, field: string, agg: string, from: string, to: string, interval: string

    const that = this;
    const id = this.deviceId;
    const field = this.dataKey;
    const agg = this.agg.name;
    const interval = this.interval.name;
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
    this.deviceHistoryService.getStatistics(id, field, agg, fromdate, todate, interval).subscribe({
      next: function (val) {

        that.echartLine(val, `line_container1`);
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });

  }

  // 可视化
  echartLine(data, id) {

    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: data.map(function (item) {
          return item.label;
        })
      },
      yAxis: {
        splitLine: {
          show: false
        }
      },
      toolbox: {
        left: 'center',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [{
        startValue: '2014-06-01'
      }, {
        type: 'inside'
      }],
      visualMap: {
        top: 10,
        right: 10,
        pieces: [{
          gt: 0,
          lte: 50,
          color: '#096'
        }, {
          gt: 50,
          lte: 100,
          color: '#ffde33'
        }, {
          gt: 100,
          lte: 150,
          color: '#ff9933'
        }, {
          gt: 150,
          lte: 200,
          color: '#cc0033'
        }, {
          gt: 200,
          lte: 300,
          color: '#660099'
        }, {
          gt: 300,
          color: '#7e0023'
        }],
        outOfRange: {
          color: '#999'
        }
      },
      series: {
        name: 'type',
        type: 'line',
        data: data.map(function (item) {
          return item.value;
        }),
        markLine: {
          silent: true,
          data: [{
            yAxis: 50
          }, {
            yAxis: 100
          }, {
            yAxis: 150
          }, {
            yAxis: 200
          }, {
            yAxis: 300
          }]
        }
      }
    };
    const bmapChart = echarts.init(document.getElementById(id));
    bmapChart.setOption(option);
  }

  // 返回
  goback() {
    window.history.back();
  }

  // 页面跳转
  jumpHandle(url) {
    this.router.navigate([url]);
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

    this.deviceHistoryService.getHistoryProperty(this.deviceId, this.page, this.pageSize, this.dataKey, fromdate, todate, ).subscribe({
      next: function (val) {
        that.historydatalist = val.items;
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
}
