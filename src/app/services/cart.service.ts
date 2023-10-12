import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNum: BehaviorSubject<number> = new BehaviorSubject(0)

  addToCartItem(prodId:string): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: prodId
    })
  }

  getCartUser(): Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  removeCartItem(id: string): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateCount(id: string, countNum: number): Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: countNum
    })
  }

  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
}
