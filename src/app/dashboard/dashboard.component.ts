import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule, MatMenuModule } from '@angular/material';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenavModule;
  @ViewChild('menu') menu: MatMenuModule;

  currentUser: User;
  currentUserSubscription: Subscription;
  opened: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
) {
}

  ngOnInit() {
    this.opened = true;
  }

  onPositionChanged() {
    this.opened = !this.opened;
  }

  logOff() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }
}
