import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WichLesService {

  constructor(private _HttpClient:HttpClient) { }

  getWihchLes(): Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }

  addToWichLes(prodId: string): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
      productId: prodId
    })
  }

  removeFromWichLes(prodId: string): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`)
  }
}
