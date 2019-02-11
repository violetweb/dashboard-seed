import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registrant } from './registrant';

@Injectable({
  providedIn: 'root'
})
export class AceconnexService {

  constructor(private http:  HttpClient) { }
  url = '/api';

  getConnexRegistrants() {
      return this.http.get<Registrant[]>(this.url + '/aceconnex/all');
  }

}
