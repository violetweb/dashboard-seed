import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*'),
]);

  loginForm = new FormGroup({
  'emailFormControl': new FormControl(null),
  'passwordFormControl': new FormControl(null),
  });
  

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    localStorage.setItem('currentUser', JSON.stringify('valerie'));
    
  }

}
