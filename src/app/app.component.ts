import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PopupService } from './popup/popup.service';
import { PopupComponent } from './popup/popup.component';
import { User } from './user';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


    title = 'Acetronic Dashboard';
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        injector: Injector, public popup: PopupService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
          // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }


}
