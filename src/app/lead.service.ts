import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from './lead';
import { LeadTypes } from './leadtypes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http:  HttpClient) { }
  url =  environment.baseUrl;

  getLeads() {
      return this.http.get<Lead[]>(this.url + '/lead/all' );
  }

  insertLead(company, street_address, unit, city, prov, postal_zip, first_name, ast_name, title, email, phone, ext, lead_type) {
    //  return this.http.post<any>(this.url + '/attendee/insert',{});
    return this.http.post<any>(environment.baseUrl + '/lead/insert', { company, street_address,unit,city,prov,postal_zip,first_name, ast_name,title,email,phone,ext,lead_type});

  }
  updateLead(id) {
    return this.http.get(this.url + '/lead/update/' + id);
  }
  deleteLead(id) {
    return this.http.post(this.url + '/lead/delete', { id } );
  }

  getLeadTypes() {
      return this.http.get<LeadTypes[]>(this.url + '/lead/leadtypes' );
  }
}
