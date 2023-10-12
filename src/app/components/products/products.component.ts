import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { WichLesService } from 'src/app/services/wich-les.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(private _ProductsDataService:ProductsDataService, private _CartService:CartService, private _ToastrService:ToastrService, private _WichLesService:WichLesService){}

  productsData: any[] = [];
  wichLesData: string[] = [];
  searchInput: string = '';
  overlay:boolean = false;

  ngOnInit(): void {
    this.overlay = true
    this._ProductsDataService.getProducts().subscribe({
      next: (response)=>{
        // console.log(response);
        this.productsData = response.data;
      },
      error: (err)=>{
        console.log(err);
        
      }
    })

    this._WichLesService.getWihchLes().subscribe({
      next: (response)=>{
        // console.log(response);
        this.wichLesData = response.data.map((item: any)=> item._id)
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  addProduct(id:string): void{
    this.overlay = true
    this._CartService.addToCartItem(id).subscribe({
      next: (response)=>{
        // console.log(response);
        this._ToastrService.success('It has been successfully added. 🛺')
        this._CartService.cartNum.next(response.numOfCartItems)
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  addRemoveWichLes(id:string, ele: HTMLElement): void{   
    this.overlay = true
    ele.classList.toggle('text-red') // this._Renderer2.addClass/remove(ele, 'text-red')

    if(ele.classList.value.split(' ').length == 4){
      this._WichLesService.addToWichLes(id).subscribe({
        next: (response)=>{
          // console.log(response);
          this._ToastrService.success('It has been successfully added. ❤')
          this.wichLesData = response.data
          this.overlay = false
        },
        error: (err)=>{
          console.log(err);
          this.overlay = false
        }
      })
    }
    else{
      this._WichLesService.removeFromWichLes(id).subscribe({
        next: (response)=>{
          // console.log(response);
          this._ToastrService.success('Product has removed from your wishlist')
          this.wichLesData = response.data
          this.overlay = false
        },
        error: (err)=>{
          console.log(err);
          this.overlay = false
        }
      })
    }
  }

}
