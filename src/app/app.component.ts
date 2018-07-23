import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public router: Router) {

  }

  ngOnInit() {

    this.router.events
      .subscribe((event) => {
        $(window).scrollTop(0);

      });


  }


}
