import { Component, OnInit } from '@angular/core';
import { ROUTELIST } from './route-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  routes = ROUTELIST;

  constructor(public router: Router, ) { }

  ngOnInit() {
  }

  goToZheRoute(para) {
    this.router.navigate([para]);
  }

}
