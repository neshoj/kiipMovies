import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileResult } from 'app/profile-result';
import { Observable } from 'rxjs/Observable';
import { TokenResult } from 'app/TokenResult';



@Injectable()
export class ServerRequestService {
  profileURL = 'http://localhost:3000/profile';
  httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${(<TokenResult>JSON.parse(localStorage.getItem('currentUser'))).token}`)
      .set('Content-Type', 'application/json')
  };
  constructor(private http: HttpClient) { }

  fetchProfileByEmail(email: string): Observable<ProfileResult> {
    return this.http.post(this.profileURL, {
      email: email
    }, this.httpOptions)
      .map((response: ProfileResult) => {
        console.log('Profile response: ' + JSON.stringify(response));
        return response;
      });
  }

}
