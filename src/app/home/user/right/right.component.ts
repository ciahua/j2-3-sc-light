import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GUIZTREENODE } from '../../../data/gui-z-tree';

declare var $: any;
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  zTreeObj: any;

  setting = {}; // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）

  // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
  zNodes = GUIZTREENODE;

  // 弹框
  closeResult: string;

  constructor(private modalService: NgbModal) {



  }

  ngOnInit() {

  }

  // 弹框操作
  open(content) {
    const that = this;
    const modal = this.modalService.open(content, { size: 'lg' });
    this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    const that1 = this;
    this.zTreeObj = $.fn.zTree.init($('#guitree'), this.setting, this.zNodes);
    this.zTreeObj = $.fn.zTree.init($('#guitree'), this.setting, this.zNodes);
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

}
