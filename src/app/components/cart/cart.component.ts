import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _Router:Router){}

  cartDetails: any = {}
  numOfItems: number = 0
  empty:boolean = true;
  overlay:boolean = false;
  cartId: string = ''

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: ({data , numOfCartItems})=>{
        // console.log('data: ' , data , '\nnumOfCartItems:' , numOfCartItems);
        this.cartId = data._id
        this.cartDetails = data;
        this.numOfItems = numOfCartItems;
        this.empty = !(this.numOfItems > 0);
      }
    })
  }

  removeProduct(id: string): void {
    this.overlay = true
    this._CartService.removeCartItem(id).subscribe({
      next: (response)=>{
        // console.log(response);
        this.overlay = false
        this.cartDetails = response.data;
        this._CartService.cartNum.next(response.numOfCartItems)
        this.numOfItems = response.numOfCartItems;
        this.empty = !(this.numOfItems > 0);
        // if(this.empty){
        //   this._Router.navigate(['/home'])
        // }
      },
      error: (err)=>{
        console.log(err)
        this.overlay = false
      }
    })
  }

  changeCount(id: string, count: number): void{
    this.overlay = true
    if(count < 1){
      this.removeProduct(id)
    }else{
      this._CartService.updateCount(id, count).subscribe({
        next: (response)=>{
          // console.log(response);
          this.cartDetails = response.data;
          this.overlay = false
        },
        error: (err)=>{
          console.log(err)
          this.overlay = false
        }
      })
    }
    
  }

  clearCart(): void {
    this.overlay = true
    this._CartService.clearUserCart().subscribe({
      next: (response)=>{
        // console.log(response);
        if(response.message == "success"){
          this._CartService.cartNum.next(0)
          this._Router.navigate(['/home']);
          this.overlay = false;
        }
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }
}
