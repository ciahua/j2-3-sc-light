/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: light.component.ts
@time: 2018 /8 / 9 9: 00

*/
import { Component, OnInit} from '@angular/core';

import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  providers: [NgbTimepickerConfig] // add NgbTimepickerConfig to the component providers
})
export class LightComponent implements OnInit  {

  constructor( ) {

  }

  ngOnInit() {

  }


}
