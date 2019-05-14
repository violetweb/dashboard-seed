import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendee } from './attendee';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AttendeeService {

  constructor(private http:  HttpClient) { }
  url =  environment.baseUrl;

  getAttendees() {
      return this.http.get<Attendee[]>(this.url + '/attendee/all');
  }

  insertAttendee(fullname, company, title, email, phone){
    //  return this.http.post<any>(this.url + '/attendee/insert',{});
    return this.http.post<any>(environment.baseUrl + '/attendee/insert', { fullname, company,title,email,phone });

  }
  updateAttendee(id){
    return this.http.get(this.url + '/attendee/update/' + id);
  }
  deleteAttendee(id){
    return this.http.post(this.url + '/attendee/delete', { id } );
  }

}
