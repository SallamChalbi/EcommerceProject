import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit{
  constructor(private _Router:Router, private _CartService:CartService){}

  cartNumber: number = 0

  ngOnInit(): void {
    this._CartService.cartNum.subscribe({
      next: (data)=>{
        // console.log(data);
        this.cartNumber = data
      },
      error: (err)=>{
        console.log(err);
      }
    })

    this._CartService.getCartUser().subscribe({
      next: (response)=>{
        // console.log(response);
        this.cartNumber = response.numOfCartItems;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  signOut(): void{
    localStorage.removeItem('_token')
    localStorage.removeItem('_email')
    this._Router.navigate(['/sign-in']);
  }

}
