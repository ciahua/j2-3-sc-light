import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { CITYTREE } from '../../data/city-tree';
import { GridsterModule } from 'angular-gridster2';
import { VideoService } from '../../service/video.service';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';

// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @ViewChild('map3') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象
  city = '广州市'; // 当前选中城市
  controlShow = false; // 控制页

  addImg = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  zTreeObj: any;

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes: any;
  isActive: number; // 被选中的视频

  videoNum = 1;
  that = this;

  options: GridsterConfig;
  // dashboard: Array<GridsterItem>;
  dashboard: Array<any>;
  dashboardO: Array<any>;
  dashboardF: Array<any>;
  dashboardN: Array<any>;

  public zTreeOnClick: (event, treeId, treeNode) => void;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }



  constructor(private videoService: VideoService) {
    // 树的操作
    // 点击
    const that = this;
    this.zTreeOnClick = (event, treeId, treeNode) => {
      const index = this.isActive;
      this.city = treeNode.fullName;
      console.log(treeNode.tId + ', ' + treeNode.fullName);
      this.getPoint(that.map, that.city);

      if (this.isActive !== null && this.isActive !== undefined) {
        this.addImg[index] = 0;
      }
    };

  }



  ngOnInit() {


    this.addBeiduMap();

    // this.options = {
    //   itemChangeCallback: VideoComponent.itemChange,
    //   itemResizeCallback: VideoComponent.itemResize,
    // };

    this.dashboardO = [
      { cols: 2, rows: 1, y: 0, x: 0, isActive: false },

    ];
    this.dashboardF = [
      { cols: 6, rows: 6, y: 0, x: 0 , isActive: false  },
      { cols: 6, rows: 6, y: 0, x: 0 , isActive: false  },
      { cols: 6, rows: 6, y: 0, x: 0 , isActive: false  },
      { cols: 6, rows: 6, y: 0, x: 0 , isActive: false  },
    ];

    this.dashboardN = [
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
      { cols: 4, rows: 4, y: 0, x: 0 , isActive: false  },
    ];
    this.dashboard = this.dashboardO ;

    this.getZoneDefault();

  }

  getZoneDefault () {
    const that = this;
    const setting = {// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      callback: {
        onClick: this.zTreeOnClick
      }
    };
    this.videoService.getZoneDefault()
      .subscribe({
        next: function (res) {
          that.model.ZoneDefault = res;
          that.zNodes = res.regions;
          that.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, that.zNodes);
        },
        complete: function () {
          console.log('that.zNodes!');
          console.log(that.zNodes);
        },
        error: function (error) {
          console.log(error);
        }
      });
  }



  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别

    const marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中

  }

  // 解析地址- 设置中心和地图显示级别
  getPoint(baiduMap, city) {
    const that = this;
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    const name = city;
    let pt;

    // 将地址解析结果显示在地图上,并调整地图视野，获取数据-添加标注
    myGeo.getPoint(name, function (point) {
      if (point) {

        baiduMap.centerAndZoom(point, 19);
        pt = point;
        const marker = new BMap.Marker(point);  // 创建标注
        baiduMap.addOverlay(marker);
      } else {
        console.log('您选择地址没有解析到结果!');
      }
    }, '');
  }

  // 切换宫格
  seleteNum (num) {
    this.videoNum = num;
    this.isActive = null;
    switch (num) {
      case 1:
        this.dashboard = this.dashboardO;
        break;
      case 4:
        this.dashboard = this.dashboardF;
        break;
      case 9:
        this.dashboard = this.dashboardN;
        break;
      default:
        break;
    }
  }

  // 点击添加
  addVideo(index, num) {
    console.log(index);
    if (index === this.isActive) {
      this.isActive = null;
    } else {
      this.isActive = index;

    }
    console.log(this.isActive);

    switch (num) {
      case 1:
        this.dashboardO[index].isActive = true;
        break;
      case 4:
        this.dashboardF[index].isActive = true;
        break;
      case 9:
        this.dashboardN[index].isActive = true;
        break;
      default:
        break;
    }
  }



  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

}
