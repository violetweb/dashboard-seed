import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatAutocomplete } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, FormsModule, FormArray, Validators, FormControl } from '@angular/forms';
import { Lead } from '../Lead';
import { User } from '../User';
import { LeadService } from '../lead.service';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { networkInterfaces } from 'os';


@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  providers: [ LeadService ]
})
export class LeadComponent implements OnInit {

  displayedColumns: string[] = ['company', 'first_name', 'last_name', 'phone', 'lead_type'];
  options: string[] = ['Smith', 'Jones', 'Samson', 'White'];
  interestArray = [ { name: 'tcu',  selected: true, id: 1 }, { name: 'cables',  selected: false, id: 2 }, { name: 'heating',  selected: false, id: 3 }];
  
  leadTypesSource;
  recordNewForm: FormGroup;
  recordInteractionForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  leadDataSource;
  printButton: FormControl;
  labelXml: string;
  isNew = true;
  isExisting = false;
  isLinear = false;
  selectedLeadType;
  lastInsertId = '';
  stepDone: string;
  currentUser: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private leadService: LeadService,
    private alertService: AlertService,
    private authService: AuthenticationService,
) { }

  ngOnInit() {

    this.recordNewForm = this.formBuilder.group({
      company: new FormControl('',
      [
        Validators.required

      ]),
      street_address: new FormControl(''),
      unit: new FormControl(''),
      city: new FormControl(''),
      prov: new FormControl(''),
      postal_zip: new FormControl(''),
      first_name: new FormControl('', [ Validators.required ]),
      last_name: new FormControl('', [ Validators.required]),
      email: new FormControl(''),
      phone: new FormControl(''),
      ext: new FormControl(''),
      title: new FormControl(''),
      lead_type: new FormControl('', [Validators.required])
    });


    this.recordInteractionForm = this.formBuilder.group({
     //   interests: this.formBuilder.array(FormArray['']),
        followup: new FormControl(FormArray['']),
        priority: new FormControl([]),
        problems: new FormControl([]),
        notes: new FormControl()
    });
    this.getLeads();
    this.getLeadTypes();
  }

  // convenience getter for easy access to form fields
  get f() { return this.recordNewForm.controls; }



  get followup() {
    return this.recordInteractionForm.get('followup');
  }
  get problems() {
    return this.recordInteractionForm.get('problems');
  }
  get priority() {
    return this.recordInteractionForm.get('priority');
 }



  selectionChanged(item) {
      if (item.value === 'new') {
        this.isExisting = false;
        this.isNew = true;
      }
      if (item.value === 'existing') {
        this.isExisting = true;
        this.isNew = false;
      }
  }


  getLeads() {
    this.leadService.getLeads().subscribe(data => {
      this.leadDataSource = new MatTableDataSource<Lead>(data['data'].slice());
      this.leadDataSource.paginator = this.paginator;
    });
  }
  getLeadTypes() {
    this.leadService.getLeadTypes().subscribe(data => {
      this.leadTypesSource = data['data'].slice();
    });
  }

  onStepChange($event): void {

    this.loading = true;

    switch ($event['selectedIndex']) {
      case 0: {
         break;
      }
      case 1: {
        if (this.recordNewForm.invalid) {
          return;
        }
        if (this.lastInsertId === '' && this.recordNewForm.dirty) {
          //this.submitNewForm();
        } else {
          // this.submitChangeForm();
        }
         break;
      }
      case 2: {
        this.submitInteractionForm();
      }
      default: {
         break;
      }
   }
  }


  submitChangeForm() {

    this.leadService.updateLead(this.lastInsertId, this.f.company.value, this.f.street_address.value,
      this.f.unit.value, this.f.city.value, this.f.prov.value,
      this.f.postal_zip.value, this.f.first_name.value, this.f.last_name.value,
      this.f.title.value,  this.f.email.value, this.f.phone.value,
      this.f.ext.value, this.f.lead_type.value)
      .pipe(first())
          .subscribe(
              data => {
                 this.loading = false;
                },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
         });
  }


  submitNewForm() {


   this.submitted = true;
 

   this.leadService.insertLead(localStorage.getItem('currentUser'), this.f.company.value, this.f.street_address.value,
   this.f.unit.value, this.f.city.value, this.f.prov.value,
   this.f.postal_zip.value, this.f.first_name.value, this.f.last_name.value,
   this.f.title.value,  this.f.email.value, this.f.phone.value,
   this.f.ext.value, this.f.lead_type.value)
   .pipe(first())
       .subscribe(
           data => {
              this.loading = false;
              this.lastInsertId = data['result'].slice();
             console.log(this.lastInsertId);
             console.log(localStorage.getItem('currentUser'));
             },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
      });

  }

  submitInteractionForm() {

    
    this.submitted = true;
    this.leadService.insertInteraction(localStorage.getItem('currentUser'), )
    .pipe(first())
        .subscribe(
            data => {
               this.loading = false;
               this.lastInsertId = data['result'].slice();
              console.log(this.lastInsertId);
              console.log(localStorage.getItem('currentUser'));
              },
               error => {
                   this.alertService.error(error);
                   this.loading = false;
       });

   }

  deleteLead(id) {
    this.loading = true;
    this.leadService.deleteLead(id)
      .subscribe(res => {
          this.loading = false;
          this.getLeads();
        }, (err) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

}
