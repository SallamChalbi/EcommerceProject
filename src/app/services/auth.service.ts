import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  register(userData: object): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
  }

  login(userData: object): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
  }

  forgetPassword(userData: object): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', userData);
  }

  verifyCode(userData: object): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', userData);
  }

  resetPassword(userData: object): Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', userData);
  }
}
