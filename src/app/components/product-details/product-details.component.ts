import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { WichLesService } from 'src/app/services/wich-les.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsDataService:ProductsDataService, private _CartService:CartService, private _ToastrService:ToastrService, private _WichLesService:WichLesService){}

  productID: any;
  productDetails: any = null;
  wichLesData: string[] = []
  overlay:boolean = false;

  ngOnInit(): void {
    this.overlay = true
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) =>{
        // console.log(params);
        this.productID = params.get('id');
      }
    })

    this._ProductsDataService.getProductID(this.productID).subscribe({
      next: (response) => {
        // console.log(response);
        this.productDetails = response.data;
      },
      error: (err) => {
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

  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  addProduct(id:string): void{
    this.overlay = true
    this._CartService.addToCartItem(id).subscribe({
      next: (response)=>{
        // console.log(response);
        this._CartService.cartNum.next(response.numOfCartItems)
        this._ToastrService.success('It has been successfully added. 🛺')
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = true
      }
    })
  }

  addRemoveWichLes(id:string, ele: HTMLElement): void{   
    this.overlay = true
    ele.classList.toggle('text-red') // this._Renderer2.addClass/remove(ele, 'text-red')
    if(ele.classList.value.split(' ').length == 5){
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
