import { Component, OnInit } from '@angular/core';
import { MatTabsModule, MatIconModule, matTabsAnimations, _countGroupLabelsBeforeOption } from '@angular/material';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators, FormControl } from '@angular/forms';
import { AttendeeService } from '../attendee.service';
import { AlertService } from '../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import * as dymo from 'dymo/DYMO.Label.Framework.3.0';


@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss'],
  providers: [ AttendeeService ]

})
export class AttendeeComponent implements OnInit {

    recordAttendeeForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    attendeeDataSource;
    attendeeLabelSource;
    label: dymo.label;
    labelText: string;
    printers;
    printername: string;
    badgeId: string;
    printButton: FormControl;
    labelXml: string;

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
      this.getAttendees();
      this.badgeId = '';
  }

    // convenience getter for easy access to form fields
    get f() { return this.recordAttendeeForm.controls; }

    getAttendees() {
      this.attendeeService.getAttendees().subscribe(data => {
        this.attendeeDataSource = data['data'].slice();
        if (this.badgeId) {
          this.attendeeLabelSource = this.attendeeDataSource.filter(d =>
            d.BadgeId === this.badgeId
          );
        }
      });

    }

    onAttendeeSubmit() {

      this.loading = true;
        // stop here if form is invalid
        if (this.recordAttendeeForm.invalid) {
            return;
        }
        this.submitted = true;
        this.attendeeService.insertAttendee(this.f.fullname.value, this.f.company.value, 
          this.f.title.value, this.f.email.value, this.f.phone.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.loading = false;
                  this.badgeId = data['result'].slice(); //If successfully inserted, the "result = > badgeId is returned"
                  if (this.badgeId !== '') {
                    this.doLabel();
                    
                    this.labelText = this.badgeId;
                    this.labelText  += '<br/>' + this.attendeeLabelSource.fullname;
                    this.labelText  += '<br/>' + this.attendeeLabelSource.company;
                  }
                  this.getAttendees();
               },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

      doLabel() {

          this.attendeeLabelSource = this.attendeeDataSource.filter(d =>
            d.BadgeId === this.badgeId
          );
        //  console.log(this.attendeeLabelSource.length);
        //  console.log(this.attendeeLabelSource);

      }

      deleteAttendee(id) {
        this.loading = true;
        this.attendeeService.deleteAttendee(id)
          .subscribe(res => {
              this.loading = false;
              this.getAttendees();
            }, (err) => {
              console.log(err);
              this.loading = false;
            }
          );
      }

       // loads all supported printers into a combo box 
     loadPrinters() {
        this.printers = dymo.label.framework.getPrinters();
        if (this.printers.length = 0) {
          alert('No DYMO printers are installed. Install DYMO printers.');
          return;
        }

        for (const p of this.printers) {
          if (p.printerType = 'LabelWriterPrinter') {
              this.printername = p.name;
              console.log(this.printername);
             // option = document.createElement('option');
              //option.value = printerName;
             // option.appendChild(document.createTextNode(printerName));
             // printersSelect.appendChild(option);
          }
      }
  }


  onPrintButton() {

      // use jQuery API to load label
      //$.get("Address.label", function(labelXml)
      // {
        this.label = dymo.label.framework.openLabelXml(this.getAddressLabelXml());
        // check that label has an address object
      //  if (this.label.getAddressObjectCount() == 0) {
       //     alert("Selected label does not have an address object on it. Select another label");
       //     return;
     
        //updatePreview();
        //addressTextArea.value = getAddress();
        //printButton.disabled = false;
        //addressTextArea.disabled = false;
        //}, "text");

  }

    getAddressLabelXml() {

    this.labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                    <DieCutLabel Version="8.0" Units="twips">\
                      <PaperOrientation>Landscape</PaperOrientation>\
                      <Id>Address</Id>\
                      <PaperName>30252 Address</PaperName>\
                      <DrawCommands>\
                        <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />\
                      </DrawCommands>\
                      <ObjectInfo>\
                        <AddressObject>\
                          <Name>Address</Name>\
                          <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                          <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                          <LinkedObjectName></LinkedObjectName>\
                          <Rotation>Rotation0</Rotation>\
                          <IsMirrored>False</IsMirrored>\
                          <IsVariable>True</IsVariable>\
                          <HorizontalAlignment>Left</HorizontalAlignment>\
                          <VerticalAlignment>Middle</VerticalAlignment>\
                          <TextFitMode>ShrinkToFit</TextFitMode>\
                          <UseFullFontHeight>True</UseFullFontHeight>\
                          <Verticalized>False</Verticalized>\
                          <StyledText>\
                            <Element>\
                              <String>DYMO\
                                828 San Pablo Ave Ste 101\
                                Albany, CA 94706-1678</String>\
                                    <Attributes>\
                                        <Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                    </Attributes>\
                                </Element>\
                            </StyledText>\
                            <ShowBarcodeFor9DigitZipOnly>False</ShowBarcodeFor9DigitZipOnly>\
                            <BarcodePosition>AboveAddress</BarcodePosition>\
                            <LineFonts>\
                                <Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                <Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                <Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                            </LineFonts>\
                        </AddressObject>\
                        <Bounds X="332" Y="150" Width="4455" Height="1260" />\
                    </ObjectInfo>\
                </DieCutLabel>';
}


        // prints the label
        /*
        doPrintButton() {
          try {
            if (!label) {
               alert("Load label before printing");
               return;
            }
            alert(printersSelect.value);
            label.print(printersSelect.value);
            label.print("unknown printer");
          }
          catch (e) {
              alert(e.message || e);
          }
      }


  
  loadLabelFromWeb() {
      // use jQuery API to load label
      //$.get("Address.label", function(labelXml)
      // {
      this.label = dymo.label.framework.openLabelXml(this.getAddressLabelXml());
      // check that label has an address object
      if (this.label.getAddressObjectCount() == 0) {
          alert("Selected label does not have an address object on it. Select another label");
          return;
      }

      //updatePreview();
      //addressTextArea.value = getAddress();
      //printButton.disabled = false;
      //addressTextArea.disabled = false;
      //}, "text");
  }
*/

}
