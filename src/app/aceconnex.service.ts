import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registrant } from './registrant';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AceconnexService {

  constructor(private http:  HttpClient) { }
  url =  environment.baseUrl;

  getConnexRegistrants() {
      return this.http.get<Registrant[]>(this.url + '/aceconnex/all');
  }

}
