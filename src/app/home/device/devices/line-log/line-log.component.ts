
import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DeviceHistoryService } from '../../../../service/device-history.service';
const now = new Date();

@Component({
  selector: 'app-line-log',
  templateUrl: './line-log.component.html',
  styleUrls: ['./line-log.component.scss']
})
export class LineLogComponent implements OnInit {
  userId: string;
  historyList = [];
  queryStr = '';
  page = 1;
  pageSize = 10;
  total = 0;
  startDate: NgbDateStruct =
    { year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate() > 28 ? 28 : now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 23, minute: 59, second: 59 };
  constructor(
    private deviceHistoryService: DeviceHistoryService,
  ) { }

  ngOnInit() {
    this.getlogs();
  }

  getlogs() {
    const that = this;
    if (typeof (this.startDate) === 'string') {
      console.log('日期错误！');
      console.log(this.startDate);
      return;
    }
    const smonth = this.startDate.month.toString().length > 1 ? this.startDate.month.toString() : `0${this.startDate.month.toString()}`;
    const sday = this.startDate.day.toString().length > 1 ? this.startDate.day.toString() : `0${this.startDate.day.toString()}`;

    const shour = this.startTime.hour.toString().length > 1 ? this.startTime.hour.toString() : `0${this.startTime.hour.toString()}`;
    const sminute = this.startTime.minute.toString().length > 1 ? this.startTime.minute.toString() : `0${this.startTime.minute.toString()}`;

    const emonth = this.endDate.month.toString().length > 1 ? this.endDate.month.toString() : `0${this.endDate.month.toString()}`;
    const eday = this.endDate.day.toString().length > 1 ? this.endDate.day.toString() : `0${this.endDate.day.toString()}`;

    const ehour = this.endTime.hour.toString().length > 1 ? this.endTime.hour.toString() : `0${this.endTime.hour.toString()}`;
    const eminute = this.endTime.minute.toString().length > 1 ? this.endTime.minute.toString() : `0${this.endTime.minute.toString()}`;

    const fromdate =
      `${this.startDate.year}-${smonth}-${sday}T${shour}:${sminute}`;

    const todate = `${this.endDate.year}-${emonth}-${eday}T${ehour}:${eminute}`;
    this.deviceHistoryService.getlogs(this.userId, this.page, this.pageSize, this.queryStr, fromdate, todate)
      .subscribe({
        next: function (val) {
          that.historyList = val.items;
          that.total = val.total;
        },
        error: function (error) {
          console.log(error);

        }
      });
  }

  // 返回
  goback() {
    window.history.back();
  }

  // 分页获取数据
  pageChange() {
    this.getlogs();
  }

  // 搜索
  dataSearch() {
    this.page = 1;
    this.getlogs();
  }

}
