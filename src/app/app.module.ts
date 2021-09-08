import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule, MatSortModule, MatFormFieldModule, MatTabsModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { FileDetector } from 'protractor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConnexComponent } from './connex/connex.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendeeComponent } from './attendee/attendee.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { LeadComponent } from './lead/lead.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    PopupComponent,
    DashboardComponent,
    ConnexComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent,
    AttendeeComponent,
    SuppliersComponent,
    LeadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
   
  ],
  providers: [
    PopupService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
    
    ]
})
export class AppModule { }
