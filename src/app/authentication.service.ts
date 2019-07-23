import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  url = environment.baseUrl;

  token: string;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.stringify(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      //currentUser is actually a "token";
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }


  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('currentUser');
    }
    return this.token;
  }


/*
  login(username: string, password: string) {

    return this.http.post<any>(environment.baseUrl + '/users/authenticate', { username, password })
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
*/

  login(client_id: string, client_secret: string) {

  /*  Here, we are using OAuth to query for a token for this user.
      1.  send over client_id / client_secret and if they exist in the oauth_clients table, 
          generates a "token" for use with this session.
      2.  Token is saved to local Storage.
  */
  let grant_type = 'client_credentials';
   return this.http.post<any>(environment.baseUrl + '/token', {client_id, client_secret, grant_type })
        .pipe(map(data => {
            // login successful if there's a jwt token in the response
            if (data) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', data.access_token);
                //localStorage.setItem('client_id', client_id);
               // localStorage.setItem('client_secret', client_secret);
                this.currentUserSubject.next(data);
                console.log(data);
            }

            return data;
        }));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }


}
