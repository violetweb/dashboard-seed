import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  url = '/api';

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    return this.http.post<any>(this.url + '/users/authenticate', { username, password })
        .pipe(map(data => {
            // login successful if there's a jwt token in the response
            if (data) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data[0].username));
                this.currentUserSubject.next(data);
            }

            return data;
        }));
}
  logout() {
    localStorage.removeItem('currentUser');
  }
}
