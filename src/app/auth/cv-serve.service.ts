import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
// export class CvServeService {
//   _url = 'http://localhost:5000/api/users/cvdata';
//   constructor(public _http: HttpClient) {}
//   register(userData: any) {
//     console.log(userData);
//     const headers = new HttpHeaders()
//       .set('Content-Type', 'application/json')
//       .set('Authorization', 'Bearer ' + localStorage.getItem('auth_tkn'));
//     return this._http.post<any>(
//       this._url,
//       { jwt: localStorage.getItem('token'), data: userData },
//       { headers: headers }
//     );
//   }
  
//   getdata() {
//     const headers = new HttpHeaders()
//       .set('Content-Type', 'application/json')
//       .set('Authorization', 'Bearer ' + localStorage.getItem('auth_tkn'));
//     return this._http.get<any>('http://localhost:5000/api/users/cvdata', {
//       headers: headers,
//     });
//   }
// }
export class CvServeService {
  public _resumeUrl = 'http://localhost:5000/resume';
  private _templateUrl = 'http://localhost:5000/template';
  // public _theme1Url = 'http://localhost:5000/theme1';
  // public _theme2Url = 'http://localhost:5000/theme2';
  


//  public _resumeUrl = '/resume';
//  private _templateUrl = '/template';


  resumeData:any;
 constructor(private http:HttpClient, private _router:Router) { }

 setResumeData(data:any){
   return this.http.post(this._resumeUrl, data);
 }
//  setResumeData(data:any){
//    return.this.http.post(this._theme1Url, data)
//  }
//  setResumeData(data:any){
//    return.this.http.post(this._theme2Url, data)
//  }
 getResumeData() {
   return this.http.get(this. _templateUrl)
 }
}

