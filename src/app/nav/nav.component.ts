import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})
export class NavComponent implements OnInit {

  links = ['', 'About', 'Testing', 'Cables'];
  opened: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  toggle(open) {

  }

  goHome() {
    this.router.navigate(['']);
  }

  goAbout() {
    this.router.navigate(['about']);
  }

}
