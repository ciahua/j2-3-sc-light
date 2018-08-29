import { Component, OnInit } from '@angular/core';
import { AIRAREALIST } from '../../data/air-arealist';
import { AIRDATALIST } from '../../data/air-data';
import { Router } from '@angular/router';
import { AirmonitorService } from '../../service/airmonitor.service';
// import { Point } from '../../data/point.type';

@Component({
  selector: 'app-airreport',
  templateUrl: './airreport.component.html',
  styleUrls: ['./airreport.component.scss']
})
export class AirreportComponent implements OnInit {
  isCollapsed = false;
  arealist = AIRAREALIST.list;
  airreport = AIRDATALIST.list;
  currentpoint: any; // 当前观测点
  devicelist: any;
  constructor(public router: Router, private airmonitorService: AirmonitorService) { }

  ngOnInit() {
    this.getPositions();
    console.log(this.devicelist);
  }
  getPositions() {
    const that = this;

    this.airmonitorService.getAllDevice().subscribe({
      next: function (val) {
        that.devicelist = val;
      },
      complete: function () {
        // that.addPoint(value);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 点击左侧监测点
  selectPoint(airpoint) {
    this.currentpoint = airpoint;
  }
  jumpHandle() {
    this.router.navigate([`home/application/air`]);
  }
}
