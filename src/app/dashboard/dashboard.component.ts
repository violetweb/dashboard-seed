import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenavModule;

  opened: boolean;

  constructor() { }

  ngOnInit() {
    this.opened = true;
  }

  onPositionChanged() {
    this.opened = !this.opened;
    console.log('position changed');
  }
}
