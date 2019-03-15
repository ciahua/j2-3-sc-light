import { Component, OnInit } from '@angular/core';
import { LedService } from '../../../service/led.service';
import { AirmonitorService } from '../../../service/airmonitor.service';


@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  url = 'http://172.18.8.46:3000';
  model: any = {}; // 存储数据

  user: any = {}; // 用户列表

  task1: any = {}; // 开关屏
  task2: any = {}; // 设置亮度
  task3: any = {}; // 更新节目单
  task4: any = {}; // 更新欢迎词
  plays: any = {}; // 设置播放内容
  airs: any = {}; // 设置空气质量播放内容
  users = []; // 用户列表
  tasks = []; // 任务列表
  medias = []; // 媒体列表
  programs = []; // 节目列表
  search_tasks = []; // led任务列表
  search_tasks_check = [];
  regions = [];
  regions_list = [];

  total: number; // 分页
  total_1: number; // 分页

  total_4: number; // 分页
  page: number;
  page_1: number;
  page_4: number;
  pagesize = 10;

  contrL1 = false; // 临时控制
  contrL2 = false; // 临时控制
  playTypes = [
    {
      type: 'text'
    },
    {
      type: 'image'
    },
    {
      type: 'git'
    },
    {
      type: 'video'
    },
    {
      type: 'slide_text'
    },
    {
      type: 'metrics_text'
    }
  ];
  currentType: any;

  constructor(private ledService: LedService, private airmonitorService: AirmonitorService) {
    this.page = 1;
    this.page_1 = 1;
    this.page_4 = 1;
    this.task2.value = 0;
    this.currentType = this.playTypes[0];
    this.model.airdevicelist = [];
    this.task1.id = 'DE1700220125';
    this.task2.id = 'DE1700220125';
    this.task3.id = 'DE1700220125';
    this.task4.id = 'DE1700220125';
    this.task4.fontsice = '16';
   }

  ngOnInit() {
    this.getTasks();
    this.getPrograms();
    // this.getAirdevices();
  }

  viewRegions(item) {
    console.log(item);
    this.regions_list = item;
  }

  // 分页获取节目单
  getPrograms() {
    const that = this;
    const page = this.page_4;
    const pagesize = this.pagesize;

    this.ledService.getPrograms(page, pagesize).subscribe({
      next: function (val) {

        that.programs = val.data;
        that.total_4 = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }


  // 获取空气质量点
  getAirdevices() {
    const that = this;
    const NorthEast = {
      'lng': 113.998944,
      'lat': 22.590191
    }; // 返回矩形区域的东北角
    const SouthWest = {
      'lng': 113.902502,
      'lat': 22.527578
    }; // 返回矩形区域的西南角


    this.airmonitorService.getAirDevice(NorthEast, SouthWest).subscribe({
      next: function (val) {

        that.model.airdevicelist = val; // 变为新值
      },
      complete: function () {

      },
      error: function (error) {

      }
    });
  }



  getUsers() {
    const that = this;
    const page = this.page;
    const pagesize = this.pagesize;

    this.ledService.getUsers(page, pagesize).subscribe({
      next: function (val) {

        that.users = val.data;
        that.total = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  createUser() {
    const that = this;
    const body = {
      name: this.user.name,                 // 用户账号
      password: '123456',                           // 密码
    };

    this.ledService.createUser(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getUsers();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }


  // 删除任务
  delTask(id) {
    const that = this;
    this.ledService.delTask(id).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {
        that.getTasks();

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

// 分页获取任务
  getTasks() {
    const that = this;
    const page = this.page_1;
    const pagesize = this.pagesize;

    this.ledService.getTasks(page, pagesize).subscribe({
      next: function (val) {

        that.tasks = val.data;
        that.total_1 = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
// 创建任务接口
  createTask(body) {
    const that = this;
    this.ledService.createTask(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getTasks();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 开关屏
  createTask1() {
    const id = this.task1.id;
    const value = this.contrL1 ? 1 : 0;
    const body = {
      'id': id,
      'name': '开关屏',
      'proid': '',
      'status': 'PENDING',
      'datagram': {
        'request': 'screen_switch',
        'arguments': [
          {
            'value': value
          }
        ]
      }

    };
    this.createTask(body);


  }

  // 控制亮度
  createTask2() {
    const id = this.task2.id;
    const value = Number(this.task2.value);
    const auto_value = this.contrL2 ? '1' : '0';
    const body = {

      'id': id,
      'name': '控制亮度',
      'proid': '',
      'status': 'PENDING',
      'datagram': {
        'request': 'set_brightness',
        'arguments': [
          {
            'auto_mode': auto_value,
            'value': value
          }
        ]
      }

    };

    this.createTask(body);
  }

  // 欢迎词任务
  createTask4(_pro_id) {
    // 创建任务

    const tid = this.task4.id;
    const wellname = this.task4.wellname;
    const task_body = {

      'id': tid || 'DE1700220125',
      'name': wellname,
      'proid': _pro_id,
      'status': 'PENDING',
      'datagram': {
        'request': 'update_program',
        'arguments': [
          {
            'link': `${this.url}/programs/getProgram?id=${_pro_id}`,
            'local': `/mnt/user/data/programs.json`
          }
        ]
      }

    };

    this.createTask(task_body);
  }

  // 删除节目单
  delProgram(id) {
    const that = this;
    this.ledService.delProgram(id).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {
        that.getPrograms();

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 创建节目单
  createProgram(name) {
    const that = this;
    const body = {
      'name': name,
      'id': '1',
      'display_time': 0,
      'width': 96,
      'height': 192,
      'type': 0,
      regions: this.regions

    };
    console.log(this.regions);

    this.ledService.createProgram(body).subscribe({
      next: function (val) {
        console.log(val);
        that.createTask4(val.id);
      },
      complete: function () {
        that.getPrograms();

      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // 空气质量播报节目单
  gProgram(item) {

    this.regions = [];


    this.regions.push(
      {
        'id': '1',
        'name': 'row1',
        'x': 0,
        'y': 0,
        'width': 96,
        'height': 38,
        'items': [
          {
            'font_name': 'msyh',
            'font_size': '9',
            'font_color': '#009CFF',
            'background_color': '#00000000',
            'effect_entry': '0',
            'effect_exit': '18',
            'time_entry': '3000',
            'time_exit': '3000',
            'id': '0',
            'type': 'text',
            'name': 'no name',
            'loop': '1',
            'length': 10000,
            'contents': [
              {
                'content': `PM10: ${item.pm10}`
              }
            ]
          }
        ]

      }
    );

    this.regions.push(
      {
        'id': '2',
        'name': 'row2',
        'x': 0,
        'y': 39,
        'width': 96,
        'height': 38,
        'items': [
          {
            'font_name': 'msyh',
            'font_size': '9',
            'font_color': '#009CFF',
            'background_color': '#00000000',
            'effect_entry': '0',
            'effect_exit': '18',
            'time_entry': '3000',
            'time_exit': '3000',
            'id': '0',
            'type': 'text',
            'name': 'no name',
            'loop': '1',
            'length': 10000,
            'contents': [
              {
                'content': `PM2.5: ${item.pm25}`
              }
            ]
          }
        ]

      }
    );

    this.regions.push(
      {
        'id': '31',
        'name': 'row3-1',
        'x': 0,
        'y': 80,
        'width': 96,
        'height': 38,
        'items': [
          {
            'font_name': 'msyh',
            'font_size': '9',
            'font_color': '#009CFF',
            'background_color': '#00000000',
            'effect_entry': '0',
            'effect_exit': '18',
            'time_entry': '3000',
            'time_exit': '3000',
            'id': '0',
            'type': 'text',
            'name': 'no name',
            'loop': '1',
            'length': 10000,
            'contents': [
              {
                'content': `TVOC: ${item.tvoc}`
              }
            ]
          }
        ]

      }
    );

    this.regions.push(
      {
        'id': '41',
        'name': 'row4-1',
        'x': 0,
        'y': 115,
        'width': 96,
        'height': 38,
        'items': [
          {
            'font_name': 'msyh',
            'font_size': '9',
            'font_color': '#009CFF',
            'background_color': '#00000000',
            'effect_entry': '0',
            'effect_exit': '18',
            'time_entry': '3000',
            'time_exit': '3000',
            'id': '0',
            'type': 'text',
            'name': 'no name',
            'loop': '1',
            'length': 10000,
            'contents': [
              {
                'content': `温度: ${item.temperature}`
              }
            ]
          }
        ]

      }
    );
    this.regions.push(
      {
        'id': '51',
        'name': 'row5-1',
        'x': 0,
        'y': 152,
        'width': 96,
        'height': 38,
        'items': [
          {
            'font_name': 'msyh',
            'font_size': '9',
            'font_color': '#009CFF',
            'background_color': '#00000000',
            'effect_entry': '0',
            'effect_exit': '18',
            'time_entry': '3000',
            'time_exit': '3000',
            'id': '0',
            'type': 'text',
            'name': 'no name',
            'loop': '1',
            'length': 10000,
            'contents': [
              {
                'content': `湿度: ${item.humidity}`
              }
            ]
          }
        ]

      }
    );
    this.createProgram('空气质量播报');

  }

  // 欢迎词节目单
  gProgram1() {


    this.regions = [
      {
        'id': '1',
        'name': 'Text Message',
        'x': 0,
        'y': 0,
        'width': 96,
        'height': 192,
        'items': [
          {
            'background_color': '#00000000',
            'id': '0',
            'name': 'no name',
            'length': 5000,
            'type': 'text',
            'effect_entry': '0',
            'effect_exit': '18',
            'font_name': 'msyh',
            'font_size': this.task4.fontsice,
            'font_color': '#ff0000',
            'contents': [
              {
                'content': this.task4.wellname
              }
            ]
          }
        ]
      }
    ];


    this.createProgram('欢迎词');
  }

  getProgram(item) {
    this.ledService.getProgram(item._id).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }






  pageChange_1() {
    this.getTasks();
  }



  pageChange_4() {
    this.getPrograms();
  }

  changeContr1() {
    this.contrL1 = !this.contrL1;
  }

  changeContr2() {
    this.contrL2 = !this.contrL2;
  }
  // 路灯控制页亮度调节
  formatLabel(value: number | null) {
    // this.prompt = false;
    if (!value) {
      return 0;
    }

    if (value > 64) {
      return Math.round(value / 64) + '%';
    }


    return value + '%';
  }

  // 亮度改变
  changeSlider(arg) {
    console.log('亮度改变');
    console.log(arg);
    this.task2.value = arg;
  }
}
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: led-test.component.ts
@ introduction: led
@ln:637
@time: 2018 / 7 / 2 17: 18

*/
