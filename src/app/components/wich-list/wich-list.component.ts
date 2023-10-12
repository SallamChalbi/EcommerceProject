import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WichLesService } from 'src/app/services/wich-les.service';

@Component({
  selector: 'app-wich-list',
  templateUrl: './wich-list.component.html',
  styleUrls: ['./wich-list.component.scss']
})
export class WichListComponent implements OnInit{
  constructor(private _WichLesService:WichLesService, private _CartService:CartService, private _ToastrService:ToastrService){}

  wichLesDetails: any = {}
  numOfItems: number = 0
  empty:boolean = true;
  overlay:boolean = false;

  ngOnInit(): void {
    this.overlay = true
    this._WichLesService.getWihchLes().subscribe({
      next: (response)=>{
        // console.log(response);
        this.wichLesDetails = response.data
        this.empty =  response.count == 0
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  addToCart(id:string): void{
    this.overlay = true
    this._CartService.addToCartItem(id).subscribe({
      next: (response)=>{
        // console.log(response);
        this._CartService.cartNum.next(response.numOfCartItems)
        this._ToastrService.success('It has been successfully added. 🛺')
        this.removeWichList(id)
        this.ngOnInit()
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  removeWichList(id: string): void {
    this.overlay = true
    this._WichLesService.removeFromWichLes(id).subscribe({
      next: (response)=>{
        // console.log(response);
        this.empty =  response.data.length == 0
        this.overlay = false
      },
      error: (err)=>{
        console.log(err)
        this.overlay = false
      }
    })
  }

}
