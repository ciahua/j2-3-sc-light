/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: strategy.componen.ts
@time: 2018 /8 / 16 9: 00

*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { StrategyService } from '../../service/strategy.service';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;
const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;
const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

declare let echarts;
declare let BMap;
declare let $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})

export class StrategyComponent implements OnInit {
  @ViewChild('map2') map_container: ElementRef;
  @ViewChild('map3') map_container3: ElementRef;
  isOptional = false;
  isEditable = false;

  numberFormControl = new FormControl('', [
    Validators.required,
  ]);
  number2FormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  modelData = {
    title: '删除',
    body: 'hh',
  };

  navs = [
    {
    id: 0,
    name: '策略时间'
    },
    {
      id: 1,
      name: '策略范围'
    }
  ];
  sub_navs = [{
    id: 0,
    name: '节假日时间'
  },
  {
    id: 1,
    name: '工作日时间'
  }
  ];
  nav_index = 0; // 菜单索引

  strategyList = []; // 从接口获取的策略列表
  currentStrategy: any; // 当前所选策略
  ruleList = []; // 规则集合
  currentRule: any;
  strategy_del_id: any;
  strategy_del_index: any;
  strategy_rule_del_id: any;
  strategy_rule_del_index: any;
  dateList = []; // 日期策略


  holidayList = []; // 节假日策略
  workdayList = []; // 工作时间策略
  rangeList: any; // 策略范围
  rangeListItems = []; // 规则集合

  regionList = []; // 策略所覆盖的区域ID集合

  // 弹框
  closeResult: string;
  strategy_index = 0; // 策略索引
  strategy_item: any; // 策略索引
  rule_index = 0; // 策略索引
  model: any = {}; // 存储数据
  map: any; // 地图

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zTreeObj: any; // 树
  zNodes: any; // 树结构

  strategyName: string; // 添加策略名称
  public mr: NgbModalRef; // 当前弹框

  hoveredDate: NgbDateStruct; // 日历
  fromDate: NgbDateStruct; // 日历
  toDate: NgbDateStruct; // 日历
  time: any; // 工作日时间
  brightness = 30; // 亮度
  workday_start_time = { hour: 6, minute: 30 }; // 工作日时间
  workday_end_time = { hour: 23, minute: 30 }; // 工作日时间
  workday_start_time1: any; // 工作日时间
  workday_start_time2: any; // 工作日时间
  workday_start_time3: any; // 工作日时间
  workday_start_brightness = 30 ; // 亮度
  workday_start_brightness1: any ; // 亮度
  workday_start_brightness2: any ; // 亮度
  workday_start_brightness3: any; // 亮度
  end_brightness = 0;

  holiday_start_time = { hour: 6, minute: 30 }; // 工作日时间
  holiday_end_time = { hour: 23, minute: 30 }; // 工作日时间
  holiday_start_time1: any; // 工作日时间
  holiday_start_time2: any; // 工作日时间
  holiday_start_time3: any; // 工作日时间
  holiday_start_brightness = 30; // 亮度
  holiday_start_brightness1: any; // 亮度
  holiday_start_brightness2: any; // 亮度
  holiday_start_brightness3: any; // 亮度

  step = 1; // 步骤

  nodeParentList = [];

  // hoveredDate: NgbDate;

  // fromDate: NgbDate;
  // toDate: NgbDate;

  isLinear = false; // 步骤
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  total: any; // 分页
  page = 1; // 分页
  pageSize = 10; // 分页

  allCheck = true; // 全选

  regionbody = []; // 策略覆盖区域body
  setRegionMess = false; // 下发策略
  currentTreeNodeId: any; // 当前选中的区域


  public zTreeOnClick: (event, treeId, treeNode) => void;
  public zTreeOnCheck: (event, treeId, treeNode) => void;
  constructor(private modalService: NgbModal, private strategyService: StrategyService,
     public element: ElementRef, public router: Router,
    calendar: NgbCalendar,
    private _formBuilder: FormBuilder,
    config: NgbTimepickerConfig) {
    this.fromDate = calendar.getToday();  // 日历
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10); // 日历

    config.spinners = false; // 时间控制


    // this.dateList = this.strategyList[0].dateList;
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnClick = (event, treeId, treeNode) => {    // 点击
      that.currentTreeNodeId = treeNode.id;
      that.getRegionLights(treeNode.id);

    };
    this.zTreeOnCheck = (event, treeId, treeNode) => { // 勾选


      // 获取当前被勾选的节点集合
      that.regionbody = [];

      const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      const nodes = treeObj.getCheckedNodes(true);
      console.log(nodes);

      if (nodes.length > 0) {
        nodes.map((item, i) => {
          const isParent = item.isParent;
          if (!isParent) {
            that.regionbody.push(
              {
                'allDevices': true,
                'deviceIds': [
                    0
                ],
                'regionId': item.id
            }
            );
          }
        });

      }


    };




  }

  ngOnInit() {
    this.getStrategyList();
    this.firstFormGroup = this._formBuilder.group({ // 步骤
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this.getZoneDefault(); // 获取城市

  }
  // 获取策略表
  getStrategyList() {
    const that = this;
    this.strategyService.getStrategy().subscribe({
      next: function (val) {
        that.strategyList = val;

        that.currentStrategy = that.currentStrategy || val[0];
      },
      complete: function () {
        that.getRules(that.currentStrategy);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 点击策略及初始化时调用
  getRules(item) {
    const that = this;
    const strategyId = item.id;
    this.strategyService.getRules(strategyId).subscribe({
      next: function (val) {
        that.ruleList = val;
      },
      complete: function () {
        that.selectRule(that.ruleList[0], 0);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 在左侧中点击一策略
  selectStrategy(item, index) {
    // 策略范围视图下切换策略，会回到策略时间视图
    if (this.nav_index === 1) {
      this.nav_index = 0;
    }
    this.strategy_index = index;
    this.strategy_item = item;
    const that = this;
    // this.currentRule = []; // 切换到其他策略时，当前所选规则置空
    this.currentStrategy = item;
    this.getRules(item);

  }
  // 点击一个规则
  selectRule(item, i) {
    this.currentRule = item;
    this.getWorkdayList(item);
    this.rule_index = i;
  }
  // 获取工作日中间段时间
  getWorkdayList(rule) {
    this.workdayList = [];
    this.holidayList = [];
    if (!rule) {
      return;
    }
    const len = rule.workdayRules && rule.workdayRules.length;
    const len1 = rule.holidayRules && rule.holidayRules.length;
    if (len > 2) {
      this.workdayList = rule.workdayRules.slice(1, len - 1);
    }

    if (len1 > 2) {
      this.holidayList = rule.holidayRules.slice(1, len1 - 1);
    }

  }

  // 添加策略弹框操作
  openAddStrategy(content, index) {

    // 初始参数
    const that = this;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    this.strategyName = '';
    modal.result.then((result) => {
      console.log('strategy--add');
      that.addStrategy();  // 接口处-添加策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // 接口处-添加策略
  addStrategy() {
    const that = this;
    this.strategyService.addStrategy(this.strategyName).subscribe({
      next: function (val) {
        that.getStrategyList(); // 重新获取策略
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 更新策略-弹框操作
  openUpdataStrategy(content, item, index) {

    const that = this;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;
    this.strategyName = item.name;
    modal.result.then((result) => {
      console.log('strategy -updata');
      that.updateStrategy(item.id, that.strategyName);  // 接口处-更新策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  // 接口处-更新策略
  updateStrategy(id, name) {
    const that = this;
    this.strategyService.updateStrategy(id, name).subscribe({
      next: function (val) {
        that.currentStrategy.name = name;
        that.getStrategyList(); // 重新获取策略
        // that.strategy_index = 0;
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 删除策略弹框
  openDelStrategy(content, item, i) {
    const that = this;
    this.strategy_del_id = item.id;
    this.strategy_del_index = i;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除策略
  closeDelStrategy($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delStrategy();
    }
    this.mr.close();
  }

  // 接口处-删除策略
  delStrategy() {
    const index = this.strategy_del_index;
    this.strategyList.splice(index, 1);
    const that = this;
    const id = this.strategy_del_id;
    this.strategyService.delStrategy(id).subscribe({
      next: function (val) {
        that.strategy_index = 0;
        that.currentStrategy = null;
        that.getStrategyList(); // 重新获取策略

      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 打开添加规则-弹框操作
  openAddRule(content) {
    this.step = 1;
    this.workday_start_time = { hour: 6, minute: 30 }; // 工作日时间
    this.workday_end_time = { hour: 23, minute: 30 }; // 工作日时间
    this.workday_start_time1 = null; // 工作日时间
    this.workday_start_time2 = null; // 工作日时间
    this.workday_start_time3 = null; // 工作日时间
    this.workday_start_brightness = 30; // 亮度
    this.workday_start_brightness1 = null; // 亮度
    this.workday_start_brightness2 = null; // 亮度
    this.workday_start_brightness3 = null; // 亮度
    this.end_brightness = 0;

    this.holiday_start_time = { hour: 6, minute: 30 }; // 工作日时间
    this.holiday_end_time = { hour: 23, minute: 30 }; // 工作日时间
    this.holiday_start_time1 = null; // 工作日时间
    this.holiday_start_time2 = null; // 工作日时间
    this.holiday_start_time3 = null; // 工作日时间
    this.holiday_start_brightness = 30; // 亮度
    this.holiday_start_brightness1 = null; // 亮度
    this.holiday_start_brightness2 = null; // 亮度
    this.holiday_start_brightness3 = null; // 亮度
    const that = this;
    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    modal.result.then((result) => {
      console.log('rule-add');
      that.addRules();  // 接口处-添加策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  // 添加策略规则
  addRules() {
    const that = this;
    const item = this.currentStrategy;
    const id = this.currentStrategy.id;
    const start = {
      day: this.fromDate.day,
      month: this.fromDate.month
    };
    const toDate = this.toDate ? this.toDate : this.fromDate;
    const end = {
      day: toDate.day,
      month: toDate.month
    };
    const workdayRules = [];
    const holidayRules = [];

    if (this.workday_start_time && this.workday_start_brightness) {
      workdayRules.push({
          'lightLevel': this.workday_start_brightness,
          'smart': true,
          'start': this.workday_start_time

      });

      if (this.workday_start_time1 && this.workday_start_time1.hour && this.workday_start_time1.minute && this.workday_start_brightness1) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness1,
          'smart': true,
          'start': this.workday_start_time1

        });
      }

      if (this.workday_start_time2 && this.workday_start_time2.hour && this.workday_start_time2.minute && this.workday_start_brightness2) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness2,
          'smart': true,
          'start': this.workday_start_time2

        });
      }
      if (this.workday_start_time3 && this.workday_start_time3.hour && this.workday_start_time3.minute && this.workday_start_brightness3) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness3,
          'smart': true,
          'start': this.workday_start_time3

        });
      }
      if (this.workday_end_time && this.workday_end_time.hour && this.workday_end_time.minute) {
        workdayRules.push({
          'lightLevel': this.end_brightness,
          'smart': true,
          'start': this.workday_end_time

        });
      }
    }

    if (this.holiday_start_time && this.holiday_start_brightness) {
      holidayRules.push({
        'lightLevel': this.holiday_start_brightness,
        'smart': true,
        'start': this.holiday_start_time

      });

      if (this.holiday_start_time1 && this.holiday_start_brightness1) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness1,
          'smart': true,
          'start': this.holiday_start_time1

        });
      }

      if (this.holiday_start_time2 && this.holiday_start_brightness2) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness2,
          'smart': true,
          'start': this.holiday_start_time2

        });
      }
      if (this.holiday_start_time3 && this.holiday_start_brightness3) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness3,
          'smart': true,
          'start': this.holiday_start_time3

        });
      }
      if (this.holiday_end_time) {
        holidayRules.push({
          'lightLevel': this.end_brightness,
          'smart': true,
          'start': this.holiday_end_time

        });
      }
    }


    this.strategyService.addRules(id, start, end, workdayRules, holidayRules).subscribe({
      next: function (val) {
        // that.selectStrategy(item, i); // 重新获取策略
        that.getRules(item);
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });




  }

  // 打开更新规则-弹框操作
  openUpdataRule(content, item, index) {
    this.step = 1;
    const currentRule = this.currentRule;

    // 初始参数

    this.workday_start_time = currentRule.workdayRules && currentRule.workdayRules[0] && currentRule.workdayRules[0].start; // 工作日时间
    const len = currentRule.workdayRules.length;
    this.workday_end_time = currentRule.workdayRules && currentRule.workdayRules[len - 1] &&
      currentRule.workdayRules[len - 1].start; // 工作日时间


    if (len === 3) {
      this.workday_start_time1 = currentRule.workdayRules && currentRule.workdayRules[1] && currentRule.workdayRules[1].start; // 工作日时间
      this.workday_start_brightness1 = currentRule.workdayRules &&
        currentRule.workdayRules[1] && currentRule.workdayRules[1].lightLevel; // 亮度
    } else if (len === 4) {
      this.workday_start_time1 = currentRule.workdayRules && currentRule.workdayRules[1] && currentRule.workdayRules[1].start; // 工作日时间
      this.workday_start_time2 = currentRule.workdayRules && currentRule.workdayRules[2] && currentRule.workdayRules[2].start; // 工作日时间
      this.workday_start_brightness1 = currentRule.workdayRules &&
        currentRule.workdayRules[1] && currentRule.workdayRules[1].lightLevel; // 亮度
      this.workday_start_brightness2 = currentRule.workdayRules &&
        currentRule.workdayRules[2] && currentRule.workdayRules[2].lightLevel; // 亮度
    } else if (len === 5) {
      this.workday_start_time1 = currentRule.workdayRules && currentRule.workdayRules[1] && currentRule.workdayRules[1].start; // 工作日时间
      this.workday_start_time2 = currentRule.workdayRules && currentRule.workdayRules[2] && currentRule.workdayRules[2].start; // 工作日时间
      this.workday_start_time3 = currentRule.workdayRules && currentRule.workdayRules[2] && currentRule.workdayRules[3].start; // 工作日时间
      this.workday_start_brightness1 = currentRule.workdayRules &&
        currentRule.workdayRules[1] && currentRule.workdayRules[1].lightLevel; // 亮度
      this.workday_start_brightness2 = currentRule.workdayRules &&
        currentRule.workdayRules[2] && currentRule.workdayRules[2].lightLevel; // 亮度
      this.workday_start_brightness3 = currentRule.workdayRules &&
        currentRule.workdayRules[3] && currentRule.workdayRules[3].lightLevel; // 亮度
    }

    this.workday_start_brightness = currentRule.workdayRules && currentRule.workdayRules[0] && currentRule.workdayRules[0].lightLevel; // 亮度
    this.end_brightness = 0;

    this.holiday_start_time = currentRule.holidayRules && currentRule.holidayRules[0] && currentRule.holidayRules[0].start; // 工作日时间

    const len1 = currentRule.holidayRules.length;
    this.holiday_end_time = currentRule.holidayRules && currentRule.holidayRules[len1 - 1] &&
      currentRule.holidayRules[len1 - 1].start; // 工作日时间

    if (len1 === 3) {
      this.holiday_start_time1 = currentRule.holidayRules && currentRule.holidayRules[1] && currentRule.holidayRules[1].start; // 工作日时间
      this.holiday_start_brightness1 = currentRule.holidayRules &&
        currentRule.holidayRules[1] && currentRule.holidayRules[1].lightLevel; // 亮度
    } else if (len1 === 4) {
      this.holiday_start_time1 = currentRule.holidayRules && currentRule.holidayRules[1] && currentRule.holidayRules[1].start; // 工作日时间
      this.holiday_start_time2 = currentRule.holidayRules && currentRule.holidayRules[2] && currentRule.holidayRules[2].start; // 工作日时间
      this.holiday_start_brightness1 = currentRule.holidayRules &&
        currentRule.holidayRules[1] && currentRule.holidayRules[1].lightLevel; // 亮度
      this.holiday_start_brightness2 = currentRule.holidayRules &&
        currentRule.holidayRules[2] && currentRule.holidayRules[2].lightLevel; // 亮度
    } else if (len1 === 5) {
      this.holiday_start_time1 = currentRule.holidayRules && currentRule.holidayRules[1] && currentRule.holidayRules[1].start; // 工作日时间
      this.holiday_start_time2 = currentRule.holidayRules && currentRule.holidayRules[2] && currentRule.holidayRules[2].start; // 工作日时间
      this.holiday_start_time3 = currentRule.holidayRules && currentRule.holidayRules[3] && currentRule.holidayRules[3].start; // 工作日时间
      this.holiday_start_brightness1 = currentRule.holidayRules &&
        currentRule.holidayRules[1] && currentRule.holidayRules[1].lightLevel; // 亮度
      this.holiday_start_brightness2 = currentRule.holidayRules &&
        currentRule.holidayRules[2] && currentRule.holidayRules[2].lightLevel; // 亮度
      this.holiday_start_brightness3 = currentRule.holidayRules &&
        currentRule.holidayRules[3] && currentRule.holidayRules[3].lightLevel; // 亮度
    }

    this.holiday_start_brightness = currentRule.holidayRules &&
      currentRule.holidayRules[0] && currentRule.holidayRules[0].lightLevel; // 亮度

    const that = this;
    const modal = this.modalService.open(content, { size: 'lg' });
    this.mr = modal;
    modal.result.then((result) => {
      console.log('rule-add');
      that.updataRules(item);  // 接口处-添加策略
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  // 添加更新策略规则
  updataRules(item) {
    const that = this;
    const currentStrategy = this.currentStrategy;
    const id = this.currentStrategy.id;
    const start = {
      day: this.fromDate.day,
      month: this.fromDate.month
    };
    const toDate = this.toDate ? this.toDate : this.fromDate;
    const end = {
      day: toDate.day,
      month: toDate.month
    };
    const workdayRules = [];
    const holidayRules = [];



    if (this.workday_start_time  && this.workday_start_brightness) {
      workdayRules.push({
        'lightLevel': this.workday_start_brightness,
        'smart': true,
        'start': this.workday_start_time

      });

      if (this.workday_start_time1  && this.workday_start_brightness1) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness1,
          'smart': true,
          'start': {
            hour: this.workday_start_time1.hour,
            minute: this.workday_start_time1.minute
          }

        });
      }

      if (this.workday_start_time2  && this.workday_start_brightness2) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness2,
          'smart': true,
          'start': {
            hour: this.workday_start_time2.hour,
            minute: this.workday_start_time2.minute
          }

        });
      }
      if (this.workday_start_time3  && this.workday_start_brightness3) {
        workdayRules.push({
          'lightLevel': this.workday_start_brightness3,
          'smart': true,
          'start': {
            hour: this.workday_start_time3.hour,
            minute: this.workday_start_time3.minute
          }

        });
      }
      if (this.workday_end_time ) {
        workdayRules.push({
          'lightLevel': this.end_brightness,
          'smart': true,
          'start': this.workday_end_time

        });
      }
    }

    if (this.holiday_start_time  && this.holiday_start_brightness) {
      holidayRules.push({
        'lightLevel': this.holiday_start_brightness,
        'smart': true,
        'start': this.holiday_start_time

      });

      if (this.holiday_start_time1  && this.holiday_start_brightness1) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness1,
          'smart': true,
          'start': {
            hour: this.holiday_start_time1.hour,
            minute: this.holiday_start_time1.minute
          }

        });
      }

      if (this.holiday_start_time2  && this.holiday_start_brightness2) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness2,
          'smart': true,
          'start': {
            hour: this.holiday_start_time2.hour,
            minute: this.holiday_start_time2.minute
          }

        });
      }
      if (this.holiday_start_time3 && this.holiday_start_brightness3) {
        holidayRules.push({
          'lightLevel': this.holiday_start_brightness3,
          'smart': true,
          'start': {
            hour: this.holiday_start_time3.hour,
            minute: this.holiday_start_time3.minute
          }

        });
      }
      if (this.holiday_end_time ) {
        holidayRules.push({
          'lightLevel': this.end_brightness,
          'smart': true,
          'start': this.holiday_end_time

        });
      }
    }


    this.strategyService.updataRules(id, item.id, start, end, workdayRules, holidayRules).subscribe({
      next: function (val) {
        // that.selectStrategy(item, i); // 重新获取策略
        that.getRules(currentStrategy);
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });


  }

  // 删除策略规则弹框
  openDelRule(content, item, i) {
    const that = this;
    this.strategy_rule_del_id = item.id;
    this.strategy_rule_del_index = i;
    const modal = this.modalService.open(content, { size: 'sm' });
    this.mr = modal;

  }

  // 删除策略规则
  closeDelRule($event) {
    console.log($event);
    if ($event === 'ok') {
      this.delRule();
    }
    this.mr.close();
  }

  // 接口处-删除策略
  delRule() {
    const that = this;
    const index = this.strategy_rule_del_index;
    this.ruleList.splice(index, 1);
    const id = this.currentStrategy.id;
    const rule_data_id = this.strategy_rule_del_id;
    this.strategyService.delRule(id, rule_data_id).subscribe({
      next: function (val) {
        // that.strategy_index = 0;
        that.getRules(that.currentStrategy); // 重新获取策略

      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 关闭弹框
  colseModal() {
    this.mr.close();
  }


  // 下一步
  nextStep() {
    this.step = this.step + 1;
  }

  // 上一步
  preStep() {
    this.step = this.step - 1;
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }


    if (this.fromDate !== null && this.toDate !== null) {
      console.log('from :' + this.fromDate.day);
      console.log('to :' + this.toDate.day);

      const fromStr = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      const toStr = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;

    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  // isHovered = (date: NgbDateStruct) =>
  //   this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
  // isInside = (date: NgbDateStruct) =>
  //   date.after(this.fromDate) && date.before(this.toDate)
  isRange = (date: NgbDateStruct) =>
    equals(date, this.fromDate) || equals(date, this.toDate) || this.isInside(date) || this.isHovered(date)
// 按钮响应事件
  showDatepicker(d) {
    d.toggle();
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

  // 切换菜单项-策略时间- 策略范围
  changeNav(index) {
    this.nav_index = index;
    if (index === 1) {
      this.getZtreeRegion();
      // setTimeout(() => {
      //   this.getZoneTree();
      //   this.setZtreeNode();
      // }, 1);

    }
  }

  setZtreeNode() {
    const that = this;
    const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    this.regionList.map(item => {
      const node = treeObj.getNodeByParam('id', item.regionId, null);
      if (node) {
        treeObj.checkNode(node, true, true);
        // console.log(11111111);
        // console.log(node);
        // console.log(node.parentTId);
        // console.log(node.isParent);
        this.findParent(node);
        this.findParent(node.getParentNode());

        // that.findFinalParent(node);
        // for (let i = that.nodeParentList.length - 1; i > 0; i--) {
        //   that.nodeParentList[i].open = true;
        //   console.log(333333);
        //   console.log(that.nodeParentList[i]);
        // }
      }
    });

  }

  // findFinalParent(node) {
  //   const that = this;
  //   console.log(44444444444);
  //   let p = node.getParentNode();
  //   while (p && !p.open) {
  //     that.nodeParentList.push(p);
  //     p = p.getParentNode();
  //   }
  // }

  findParent(node) {
    const p = node.getParentNode();
    if (p && !p.open) {
      console.log(444);
      p.open = true;

      // console.log(p.open);
      // const treeObj = $.fn.zTree.getZTreeObj('treeDemo');
      // const node1 = treeObj.getNodeByTId(p.tId);
      // console.log(node1);
      // node1.open = true;
      // this.findParent(p);
    }
  }
  // 获取策略所覆盖的区域集合
  getZtreeRegion() {
    const that = this;
    this.strategyService.getZtreeRegion(this.currentStrategy.id).subscribe({
      next: function (val) {
        that.regionList = val;
        console.log(val);
      },
      complete: function () {
        that.getZoneTree();
        that.setZtreeNode();
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 策略范围-策略下发
  //
  //

  // 获取城市列表
  getZoneTree() {
    // const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      view: {
        selectedMulti: true
      },
      check: {
        enable: true,
        chkStyle: 'checkbox',
        chkboxType: { 'Y': 'ps', 'N': 'ps' }
      },
      callback: {
        onClick: this.zTreeOnClick, // 点击事件
        onCheck: this.zTreeOnCheck // 勾选事件
      }
    };

    const zNodes = this.zNodes;
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes);

  }

  // 接口处-删除策略
  getRegionLights(id) {
    const that = this;
    const page = this.page;
    const pageSize = this.pageSize;
    this.strategyService.getRegionLights(id, page, pageSize).subscribe({
      next: function (val) {
        that.rangeList = val;

        that.rangeListItems = val.items;
        that.total = val.total; // 分页
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

    // 获取城市列表
  getZoneDefault() {
    const that = this;
    this.strategyService.getZoneDefault()
      .subscribe({
        next: function (res) {
          that.model.ZoneDefault = res;
          that.zNodes = res.regions;
          const id = that.currentTreeNodeId = res.regions[0].id;
          that.getRegionLights(id);

        },
        complete: function () {

        },
        error: function (error) {
          console.log(error);
        }
      });
  }

  // 下发策略
  setRegion() {
    const that = this;
    const body = this.regionbody;
    const ruleId = this.currentStrategy.id;
    this.strategyService.setRegion(ruleId, body)
      .subscribe({
        next: function (res) {
          console.log('ok!');
          that.setRegionMess = true;
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
    const id = this.currentTreeNodeId;
    this.getRegionLights(id);

  }
  // 路由跳转
  jumpHandle(url) {
    this.router.navigate([url]);
  }

}
