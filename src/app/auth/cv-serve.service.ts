import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CvServeService {
  _url = 'http://localhost:5000/api/users/cvdata';
  constructor(public _http: HttpClient) {}
  register(userData: any) {
    console.log(userData);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('auth_tkn'));
    return this._http.post<any>(
      this._url,
      { jwt: localStorage.getItem('token'), data: userData },
      { headers: headers }
    );
  }
  
  getdata() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('auth_tkn'));
    return this._http.get<any>('http://localhost:5000/api/users/cvdata', {
      headers: headers,
    });
  }
}
