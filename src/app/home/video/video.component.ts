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

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

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

    // this.dashboard = [
    //   { cols: 2, rows: 1, y: 0, x: 0 },
    //   { cols: 2, rows: 2, y: 0, x: 2 }
    // ];


      this.options = {
        gridType: GridType.Fit,
        compactType: CompactType.None,
        margin: 0,
        outerMargin: true,
        outerMarginTop: null,
        outerMarginRight: null,
        outerMarginBottom: null,
        outerMarginLeft: null,
        mobileBreakpoint: 640,
        minCols: 1,
        maxCols: 13,
        minRows: 1,
        maxRows: 12,
        maxItemCols: 3,
        minItemCols: 1,
        maxItemRows: 3,
        minItemRows: 1,
        maxItemArea: 2500,
        minItemArea: 1,
        defaultItemCols: 1,
        defaultItemRows: 1,
        fixedColWidth: 105,
        fixedRowHeight: 105,
        keepFixedHeightInMobile: false,
        keepFixedWidthInMobile: false,
        scrollSensitivity: 10,
        scrollSpeed: 20,
        enableEmptyCellClick: false,
        enableEmptyCellContextMenu: false,
        enableEmptyCellDrop: false,
        enableEmptyCellDrag: false,
        emptyCellDragMaxCols: 50,
        emptyCellDragMaxRows: 50,
        ignoreMarginInRow: false,
        draggable: {
          enabled: true,
        },
        resizable: {
          enabled: true,
        },
        swap: false,
        pushItems: true,
        disablePushOnDrag: false,
        disablePushOnResize: false,
        pushDirections: { north: true, east: true, south: true, west: true },
        pushResizeItems: false,
        displayGrid: DisplayGrid.Always,
        disableWindowResize: false,
        disableWarnings: false,
        scrollToNewItems: false
      };

      this.dashboard = [
        { cols: 2, rows: 2, y: 0, x: 0 , id: 1},
        { cols: 2, rows: 2, y: 0, x: 0, id: 2, hasContent: true },
        { cols: 2, rows: 2, y: 0, x: 0, id: 3},
        { cols: 2, rows: 2, y: 0, x: 0, id: 4},
        { cols: 2, rows: 2, y: 0, x: 0, id: 5},
        { cols: 2, rows: 2, y: 0, x: 0, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled', id: 6},
        { cols: 2, rows: 2, y: 0, x: 0, dragEnabled: true, resizeEnabled: false, label: 'Drag&Resize Disabled', id: 7},
        { cols: 2, rows: 2, y: 0, x: 0, id: 8},
        { cols: 2, rows: 2, y: 0, x: 0, id: 9 }

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
