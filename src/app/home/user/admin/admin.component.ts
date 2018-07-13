import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  zTreeObj: any;

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

      // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes = [
    {
      name: '设备概览', open: true, children: [
        { name: 'test1_1' }, { name: 'test1_2' }]
    },
    {
      name: '设备监控', open: true, children: [
        { name: 'test2_1' }, { name: 'test2_2' }]
    },
    {
      name: '设备管理', open: true, children: [
        { name: '新增' }, { name: '添加' }, { name: '报销' }]
    },
    {
      name: '系统管理', open: true, children: [
        {
          name: '用户管理', children: [
            { name: '新增' }, { name: '添加' }, { name: '修改' }
          ]
        },
        {
          name: '权限管理', children: [
            { name: '新增' }, { name: '添加' }, { name: '修改' }
          ]
        }
      ]
    }
  ];

  constructor() {



   }

  ngOnInit() {
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
  }



}
