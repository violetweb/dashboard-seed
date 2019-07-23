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

  client_id: string = localStorage.getItem('client_id');
  client_secret: string = localStorage.getItem('client_secret');
  access_token: string = localStorage.getItem('currentUser');

  getLeads() {

      return this.http.get<Lead[]>(this.url + '/lead/all'
      + '?access_token=' + this.access_token);
  }

  insertLead(access_token, company, street_address, unit, city, prov,
    postal_zip, first_name, last_name, title, email, phone, ext, lead_type) {
    //  return this.http.post<any>(this.url + '/attendee/insert',{});
   //  return this.http.post<any>(this.url + '/lead/insert', { company, street_address, 
   //   city, prov, postal_zip, first_name, last_name, title, email, phone, ext, lead_type});


   return this.http.post<any>(environment.baseUrl + '/lead/insert?access_token=' + access_token, { company, 
    street_address,  unit, city, prov, postal_zip, first_name, last_name,
    title, email, phone, ext, lead_type });

  }

  insertInteraction(access_token ) {
    //  return this.http.post<any>(this.url + '/attendee/insert',{});
   //  return this.http.post<any>(this.url + '/lead/insert', { company, street_address, 
   //   city, prov, postal_zip, first_name, last_name, title, email, phone, ext, lead_type});


   return this.http.post<any>(environment.baseUrl + '/lead/insertinteraction?access_token=' + access_token, { });

  }


updateLead(id, company, street_address, unit, city, prov, postal_zip,
    first_name, last_name, title, email, phone, ext, lead_type) {
    return this.http.post<any>(environment.baseUrl + '/lead/update?access_token=' + this.access_token, {id, company,
      street_address, unit, city, prov, postal_zip,
      first_name, last_name, title, email, phone, ext, lead_type } );
  }

  deleteLead(id) {
    return this.http.post(this.url + '/lead/delete', { id } );
  }

  getLeadTypes() {
      return this.http.get<LeadTypes[]>(this.url + '/lead/leadtypes' );
  }
}
