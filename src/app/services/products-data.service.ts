import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(private _HttpClient:HttpClient) { }

  getProducts(): Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getProductID(prodId:any): Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`)
  }

  getCategories(): Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  getSubCategoriesOfCategory(categoryId: string): Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
  }
}
