import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
         }

      }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(5)]]
        });

        // reset login status
        this.authenticationService.logout();

      // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
