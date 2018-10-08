import { Component, OnInit } from '@angular/core';
import { LedService } from '../../service/led.service';
import { AirmonitorService } from '../../service/airmonitor.service';


@Component({
  selector: 'app-led-test',
  templateUrl: './led-test.component.html',
  styleUrls: ['./led-test.component.scss']
})
export class LedTestComponent implements OnInit {
  model: any = {}; // 存储数据
  searchTaskBody: any = {}; // 存储数据
  searchTaskBody1: any = {}; // 存储数据
  searchTaskBody2: any = {}; // 存储数据
  user: any = {}; // 用户列表
  task: any = {}; // 任务列表
  task1: any = {}; // 开关屏
  task2: any = {}; // 设置亮度
  task3: any = {}; // 更新节目单
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
  total_2: number; // 分页
  total_3: number; // 分页
  total_4: number; // 分页
  page: number;
  page_1: number;
  page_2: number;
  page_3: number;
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
    this.page_2 = 1;
    this.page_3 = 1;
    this.page_3 = 1;
    this.page_4 = 1;
    this.task2.value = 0;
    this.searchTaskBody.id = 'DE1700220125';
    this.searchTaskBody.task = [];
    this.currentType = this.playTypes[0];
    this.model.airdevicelist = [];
   }

  ngOnInit() {
    // this.getUsers();
    this.getTasks();
    this.getMedias();
    this.getPrograms();
    this.searchAllTask();
    this.getAirdevices();
  }

  viewRegions(item) {
    console.log(item);
    this.regions_list = item;
  }

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
      },
      complete: function () {
        that.getPrograms();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
  gProgram(item) {
    // const p = [
    //   {}
    // ];
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
  gProgram1() {
    // this.regions = [
    //   {
    //   'id': '1',
    //   'name': 'row1',
    //   'x': 16,
    //   'y': 0,
    //   'width': 176,
    //   'height': 16,
    //   'items': [{
    //     'length': '10000',
    //     'font_pixel': '16',
    //     'font_color': '#FF0000',
    //     'background_color': '#000000',
    //     'line_spacing': '-3',
    //     'letter_spacing': '0',
    //     'effect_entry': '2',
    //     'effect_exit': '2',
    //     'type': 'metrics_text',
    //     'align_v': 'align_center',
    //     'align_h': 'align_left',
    //     'contents': [{
    //       'content': '四川南河国家湿地公园'
    //     }]
    //   }]
    //   }, {
    //     'id': '2',
    //     'name': 'row2',
    //     'x': 24,
    //     'y': 18,
    //     'width': 168,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FF0000',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '湿地生态微环境实时监测'
    //       }]
    //     }]
    //   }, {
    //     'id': '31',
    //     'name': 'row3-1',
    //     'x': 5,
    //     'y': 32,
    //     'width': 125,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': 'PM2.5   :  38'
    //       }]
    //     }]
    //   }, {
    //     'id': '32',
    //     'name': 'row3-2',
    //     'x': 130,
    //     'y': 32,
    //     'width': 62,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '9',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': 'ug/m3'
    //       }]
    //     }]
    //   }, {
    //     'id': '41',
    //     'name': 'row4-1',
    //     'x': 5,
    //     'y': 46,
    //     'width': 125,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '空气温度:  30.3'
    //       }]
    //     }]
    //   }, {
    //     'id': '42',
    //     'name': 'row4-2',
    //     'x': 130,
    //     'y': 46,
    //     'width': 62,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '℃'
    //       }]
    //     }]
    //   }, {
    //     'id': '51',
    //     'name': 'row5-1',
    //     'x': 5,
    //     'y': 60,
    //     'width': 125,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '空气湿度:  67.4'
    //       }]
    //     }]
    //   }, {
    //     'id': '52',
    //     'name': 'row5-2',
    //     'x': 130,
    //     'y': 60,
    //     'width': 62,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '%RH'
    //       }]
    //     }]
    //   }, {
    //     'id': '61',
    //     'name': 'row6-1',
    //     'x': 5,
    //     'y': 74,
    //     'width': 125,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '负氧离子:  5118'
    //       }]
    //     }]
    //   }, {
    //     'id': '62',
    //     'name': 'row6-2',
    //     'x': 130,
    //     'y': 74,
    //     'width': 62,
    //     'height': 12,
    //     'items': [{
    //       'length': '10000',
    //       'font_pixel': '13',
    //       'font_color': '#FFFF00',
    //       'background_color': '#000000',
    //       'line_spacing': '-3',
    //       'letter_spacing': '0',
    //       'effect_entry': '2',
    //       'effect_exit': '2',
    //       'type': 'metrics_text',
    //       'align_v': 'align_center',
    //       'align_h': 'align_left',
    //       'contents': [{
    //         'content': '个/cm3'
    //       }]
    //     }]
    //   }
    // ];

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
                'content': 'price tag'
              }
            ]

          }
        ]
      }
    ];

    // this.regions =  [
    //   {

    //     'id': '1',
    //     'name': 'Text Message',
    //     'x': 0,
    //     'y': 0,
    //     'width': 96,
    //     'height': 192,
    //     // 'id': '1',
    //     // 'name': '滚动文本 - 1',
    //     // 'x': 16,
    //     // 'y': 16,
    //     // 'width': 64,
    //     // 'height': 32,
    //     // 'layer': 2,
    //     'items': [
    //       {
    //         'font_name': 'msyh',
    //         'font_size': '16',
    //         'font_color': '#ff0000',
    //         'background_color': '#00000000',
    //         'effect_entry': '0',
    //         'effect_exit': '18',
    //         'time_entry': '3000',
    //         'time_exit': '3000',
    //         'id': '0',
    //         'type': 'text',
    //         'name': 'no name',
    //         'loop': '1',
    //         'length': 10000,
    //         'contents': [
    //           {
    //             'content': 'test display'
    //           }
    //         ]



    //         // 'font_pixel': '16',
    //         // 'font_color': '#FF0000',
    //         // 'background_color': '#000000',
    //         // 'line_spacing': '-3',
    //         // 'letter_spacing': '0',
    //         // 'effect_entry': '2',
    //         // 'effect_exit': '2',
    //         // 'type': 'metrics_text',
    //         // 'align_v': 'align_center',
    //         // 'align_h': 'align_left',
    //         // 'contents': [{
    //         //   'content': '四川南河国家湿地公园'
    //         // }],


    //         // 'background_color': '#00000000',
    //         // 'effect': '0',
    //         // 'is_continue': '0',
    //         // 'speed': '2',
    //         // 'pause_time': '3000',
    //         // 'id': '0',
    //         // 'type': 'slide',
    //         // 'name': 'no name',
    //         // 'length': 0,
    //         // 'contents': [
    //         //   {
    //         //     'content': '/mnt/user/data/87E2289CD7173763A8A084E902E6D31E.png'
    //         //   }
    //         // ]
    //       }
    //     ]
    //   }
    // ];
    // this.regions.push(
    //   {
    //     id: '1',
    //     name: 'region1',
    //     x: '0',
    //     y: '0',
    //     width: '96',
    //     height: '192',
    //     items: [
    //       {
    //         id: '11',
    //         name: item.name,
    //         type: item.type,
    //         length: item.length,
    //         contents: [
    //           {
    //             content: `${item.contents}`
    //           }
    //         ]
    //       }
    //     ]

    //   }
    // );

    this.createProgram('自定义播放节目');
  }
  gFiles(item) {

    this.ledService.gFiles(item._id).subscribe({
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

  playTypeChange() {}

  createMedia() {
    const that = this;
    const body = {
      name: this.plays.name,
      type: this.currentType.type,
      contents: this.plays.contents,
      length: this.plays.length,
    };

    this.ledService.createMedia(body).subscribe({
      next: function (val) {
        console.log(val);
      },
      complete: function () {

        that.getMedias();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  getMedias() {
    const that = this;
    const page = this.page_3;
    const pagesize = this.pagesize;

    this.ledService.getMedias(page, pagesize).subscribe({
      next: function (val) {

        that.medias = val.data;
        that.total_3 = val.total;
        console.log(val);
      },
      complete: function () {

      },
      error: function (error) {
        console.log(error);
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

  addTaskCtrl() {
    this.searchTaskBody.task = [];
    for (let index = 0; index < this.search_tasks_check.length; index++) {
      const element = this.search_tasks_check[index];
      if (element.check) {
        this.searchTaskBody.task.push(this.search_tasks[index]);
      }
    }


    console.log(this.searchTaskBody.task);
  }

  searchTask(type) {
    const that = this;
    let body;
    if (type === 1) { // 常规请求
      body = {
        'version': '1.0',
        'system_info': {
          id: this.searchTaskBody.id,
          width: 192,
          height: 32,
        }
      };
    } else if (type === 2) { // 终端任务执行中请求：
      const task = [];
      this.searchTaskBody.task.map((item, i) => {
        task.push({
          'id': item._id,
          'status': 'PROCESSING',
          'datagram': item.datagram
        });

      });
      body = {
        'version': '1.0',
        'system_info': {
          id: this.searchTaskBody.id,
          width: 192,
          height: 32,
        },
        'task': task
      };
    } else if (type === 3) { //  终端任务执行成功请求：
      const task = [];
      this.searchTaskBody.task.map((item, i) => {
        task.push({
          'id': item._id,
          'status': 'SUCCESS',
          'datagram': item.datagram
        });

      });
      body = {
        'version': '1.0',
        'system_info': {
          id: this.searchTaskBody.id,
          width: '192',
          height: '32',
        },
        'task': task
      };
    }


    this.ledService.searchTask(body).subscribe({
      next: function (val) {
        console.log(val);

      },
      complete: function () {
        that.getTasks();
        that.searchAllTask();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  searchAllTask() {
    const that = this;
    const id = this.searchTaskBody.id;
    const pageSize = this.pagesize;
    const currentPage = this.page_2;
    this.ledService.searchAllTask(id, currentPage, pageSize).subscribe({
      next: function (val) {
        console.log(val);
        that.search_tasks = val.data;
        that.total_2 = val.total;
        for (let index = 0; index < that.search_tasks.length; index++) {
          that.search_tasks_check.push({ check: false });
        }
      },
      complete: function () {
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

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

  createTask1() {

    const id = this.task1.id;
    const value = this.contrL1 ? 1 : 0;
    const body = {
      'id': id,
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

  createTask2() {
    const id = this.task2.id;
    const value = Number(this.task2.value);
    const auto_value = this.contrL2 ? '1' : '0';
    const body = {

      'id': id,
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

  createTask3(id) {
    const timestamp = (new Date()).valueOf();
    const tid = this.task3.id;

    const body = {

      'id': tid || 'DE1700220125',
      'status': 'PENDING',
      'datagram': {
        'request': 'update_program',
        'arguments': [
          {
            'link': `http://172.18.8.44:9600/programs/getProgram?id=${id}`,
            'local': `/mnt/user/data/programs.json`
          }
        ]
      }

    };

    this.createTask(body);
  }

  pageChange() {
    this.getUsers();
  }

  pageChange_1() {
    this.getTasks();
  }

  pageChange_2() {
    this.searchAllTask();
  }

  pageChange_3() {
    this.getMedias();
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

    if (value > 66) {
      return Math.round(value / 66) + '%';
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
