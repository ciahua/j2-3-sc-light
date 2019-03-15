/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: dashboard.component.ts
@time: 2018 /8 / 9 9: 00

*/
import { Component, OnInit, } from '@angular/core';
import { AirmonitorService } from '../../../../service/airmonitor.service';
import { Router } from '@angular/router';
// baidu map
declare let echarts;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  model: any = {}; // 存储数据

  fromdate: any; // 开始日期
  todate: any; // 结束日期
  fields = [  // 统计字段名称
    { id: 1, name: 'pm25', type: 'PM2.5' },
    { id: 2, name: 'pm10', type: 'PM10'},
    { id: 3, name: 'tvoc', type: 'TVOC' },
    { id: 3, name: 'temperature', type: '温度'},
    { id: 3, name: 'humidity', type: '湿度' },
  ];

  aggs = [ // 统计方式
    { id: 1, name: 'avg', type: '平均值' },
    { id: 2, name: 'max', type: '最大值' },
    { id: 3, name: 'min', type: '最小值' },
  ];
  intervals = [ // 时间间隔
    { id: 1, name: 'm', type: '分钟'},
    { id: 2, name: 'h', type: '小时'},
    { id: 3, name: 'd', type: '天'},
  ];
  dashData: any;
  agg: any;
  interval: any;


  constructor(private airmonitorService: AirmonitorService, public router: Router, ) {
    // JSON.stringify({ id: id, agg, fromdate, todate, interval })
    this.dashData = JSON.parse(localStorage.getItem('dash_data'));

    const fromdate = this.dashData.fromdate.slice(0, 10);
    const todate = this.dashData.todate.slice(0, 10);
    if (fromdate === todate) {
      this.intervals = [ // 时间间隔
        { id: 1, name: 'm', type: '分钟' },
        { id: 2, name: 'h', type: '小时' },
      ];
    }

    this.agg = this.aggs[0];
    this.interval = this.intervals[0];
  }

  ngOnInit() {
    if (this.dashData) {
      this.getStatistics();
    }

  }

  // 获取历史数据的统计值
  getStatistics() {
    // id: number, field: string, agg: string, from: string, to: string, interval: string

    const that = this;
    const id = this.dashData.id;
    const fromdate = this.dashData.fromdate;
    const todate = this.dashData.todate;
    const field = this.fields[0].name;

    const agg = this.agg.name;
    const interval = this.interval.name;
    this.fields.map((item, index) => {
      this.airmonitorService.getStatistics(id, item.name, agg, fromdate, todate, interval).subscribe({
        next: function (val) {

          that.echartLine(val, item.type, `line_container${index + 1}`);
        },
        complete: function () {
        },
        error: function (error) {
          console.log(error);
        }
      });

    });

  }

  aggsChange() {
    this.getStatistics();
  }

  // 可视化
  echartLine(data, type, id) {

    const option = {
      title: {
        text: type
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
        name: type,
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

  // 路由跳转
  jumpHandle(url) {
    this.router.navigate([url]);
  }

}
