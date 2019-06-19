import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule, MatIconModule, matTabsAnimations, MatInputModule, MatSelectModule } from '@angular/material';

import { Lead } from '../lead';
import { LeadTypes } from '../leadtypes';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators, FormControl } from '@angular/forms';
import { LeadService } from '../lead.service';
import { AlertService } from '../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  providers: [ LeadService ]
})
export class LeadComponent implements OnInit {

  displayedColumns: string[] = ['company', 'first_name', 'phone', 'lead_type'];
  leadTypesSource;
  recordNewForm: FormGroup;
  recordExistingForm: FormGroup;
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


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private leadService: LeadService,
    private alertService: AlertService,
) { }

  ngOnInit() {

   this.recordNewForm = this.formBuilder.group({
        company: ['', [Validators.required]],
        prov: ['', [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email]],
        phone : ['', [Validators.required]],
        title : ['', [Validators.required]],
        lead_type: ['', [Validators.required]]
  });


    this.recordNewForm = new FormGroup(
      {
      company: new FormControl(this.recordNewForm.controls.company,
      [
        Validators.required,
        Validators.minLength(5)
      ]),
      street_address: new FormControl(),
      unit: new FormControl(),
      city: new FormControl(),

      prov: new FormControl(),
      zip_postal: new FormControl(),
      first_name: new FormControl(this.recordNewForm.controls.first_name, [ Validators.required ]),
      last_name: new FormControl(this.recordNewForm.controls.last_name, [ Validators.required]),
      email: new FormControl(),
      phone: new FormControl(),
      title: new FormControl(),
      lead_type: new FormControl(),
      ext: new FormControl()
    }
    );

    this.recordExistingForm = new FormGroup({

    });
    this.getLeads();
    this.getLeadTypes();
  }

  // convenience getter for easy access to form fields
  get f() { return this.recordNewForm.controls; }



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
    // stop here if form is invalid
    if (this.recordNewForm.invalid) {
          return;
    }
    this.submitted = true;
    this.leadService.insertLead(this.f.company.value, this.f.street_address.value,
      this.f.unit.value, this.f.city.value, this.f.prov.value, this.f.postal_zip,
      this.f.first_name.value, this.f.last_name.value, this.f.title.value,
      this.f.email.value, this.f.phone.value, this.f.ext.value, this.f.lead_type.value)
      .pipe(first())
       .subscribe(
           data => {
              this.loading = false;
                this.getLeads();
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
