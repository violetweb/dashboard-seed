import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AttendeeService } from '../attendee.service';
import { AlertService } from '../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss'],
  providers: [ AttendeeService]
})
export class AttendeeComponent implements OnInit {

    recordAttendeeForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    attendeeDataSource;
  
  


  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private attendeeService: AttendeeService,
        private alertService: AlertService
       
      

  ) { }

  ngOnInit() {

     this.recordAttendeeForm = this.formBuilder.group({
          fullname: ['', [Validators.required]],
          email: ['', [Validators.required]],
          title: ['', [Validators.required]],
          company: ['', [Validators.required]],
          phone: ['', [Validators.required]]
        });


     this.attendeeService.getAttendees().subscribe(data => {
        this.attendeeDataSource = data['data'].slice();
      }
    );
  

  }

    // convenience getter for easy access to form fields
    get f() { return this.recordAttendeeForm.controls; }


    onAttendeeSubmit() {

      this.submitted = true;

        // stop here if form is invalid
        if (this.recordAttendeeForm.invalid) {
            return;
        }

        this.loading = true;
        this.attendeeService.insertAttendee(this.f.fullname.value, this.f.company.value, this.f.title.value, this.f.email.value, this.f.phone.value)
            .pipe(first())
            .subscribe(
                data => {
                   // this.router.navigate([this.returnUrl]);
                    console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  
}
