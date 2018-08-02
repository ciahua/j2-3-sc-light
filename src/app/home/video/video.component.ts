import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { CITYTREE } from '../../data/city-tree';
import { GridsterModule } from 'angular-gridster2';
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

  map: any; // 地图对象

  zTreeObj: any;
  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes = CITYTREE;

  videoNum = 9;

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  dashboardO: Array<any>;
  dashboardF: Array<any>;
  dashboardN: Array<any>;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }

  constructor() { }

  ngOnInit() {
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    this.addBeiduMap();

    // this.options = {
    //   itemChangeCallback: VideoComponent.itemChange,
    //   itemResizeCallback: VideoComponent.itemResize,
    // };

    this.dashboardO = [
      { cols: 2, rows: 1, y: 0, x: 0 },

    ];
    this.dashboardF = [
      { cols: 6, rows: 6, y: 0, x: 0 },
      { cols: 6, rows: 6, y: 0, x: 0 },
      { cols: 6, rows: 6, y: 0, x: 0 },
      { cols: 6, rows: 6, y: 0, x: 0 },
    ];

    this.dashboardN = [
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
      { cols: 4, rows: 4, y: 0, x: 0 },
    ];

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

  seleteNum (num) {
    this.videoNum = num;
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
