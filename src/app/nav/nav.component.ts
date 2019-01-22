import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  links = ['Home', 'Customer Survey', 'Testing', 'Cables'];
  opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggle(open) {

  }
}
