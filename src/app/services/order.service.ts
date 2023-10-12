import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { }

  checkOut(id: string, orderDetails: object): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ecommerce-project-ten-ecru.vercel.app`, {
      shippingAddress: orderDetails
    })
  }

  getAllOrders(): Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/orders/')
  }
}
