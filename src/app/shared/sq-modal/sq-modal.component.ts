import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sq-modal',
  templateUrl: './sq-modal.component.html',
  styleUrls: ['./sq-modal.component.scss']
})
export class SqModalComponent implements OnInit {


  @Input() // 父组件传递值

  input;

  @Output() // 事件传播 子-> 父

  output: EventEmitter<string> = new EventEmitter<string>();

  click(mes) {

    this.output.emit(mes);

  }

  constructor( ) { }

  ngOnInit() {
  }

}
