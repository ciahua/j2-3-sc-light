import { Input, Component, OnInit } from '@angular/core';
import { IssuedataService } from '../../service/issuedata.service';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

const now = new Date();

@Component({
  selector: 'app-issuedata',
  templateUrl: './issuedata.component.html',
  styleUrls: ['./issuedata.component.scss']
})
export class IssuedataComponent implements OnInit {

  issueList = [];
  issue: any = {};
  page: any;
  pageSize = 10;
  total: number;
  startDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  endDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }; // 开始日期
  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 23, minute: 59, second: 59 };
  seconds = true;
  fromdate: any; // 开始日期
  todate: any; // 结束日期

  @Input()
  public alerts: Array<IAlert> = [];

  constructor(public issuedataService: IssuedataService, public router: Router) {
    this.page = 1;
    this.issue.posNum = '';
  }

  ngOnInit() {
    this.getIssueHistoryList();
  }

  // 获取消息记录
  getIssueHistoryList() {
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

    this.issuedataService.getIssueHistoryData(this.issue.posNum, fromdate,
      todate, this.page, this.pageSize).subscribe({
      next: function(val) {
        that.issueList = val.items;
        that.total = val.total;
      },
      complete: function() {},
      error: function(error) {
        console.log(error);
        const message = error.error.errors[0].defaultMessage;
        that.alerts.push({
          id: 1,
          type: 'danger',
          message: `查询失败：${message}！`,
        });
      }
    });
  }

  // 搜索按键点击事件
  execQuery() {
    this.getIssueHistoryList();
  }
  // 换页
  pageChange() {
    this.getIssueHistoryList();
  }
  // 路由跳转
  jumpHandle(url) {
    history.back();
    // this.router.navigate([url]);
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
