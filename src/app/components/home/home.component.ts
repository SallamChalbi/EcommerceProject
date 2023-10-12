import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CartService } from 'src/app/services/cart.service';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { WichLesService } from 'src/app/services/wich-les.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsDataService:ProductsDataService, private _CartService:CartService, private _ToastrService:ToastrService, private _WichLesService:WichLesService){}

  productsData: any[] = [];
  categoryData: Category[] = [];
  wichLesData: string[] = [];
  searchInput: string = '';
  overlay:boolean = false;
  // isInWichLes: boolean = false // belongs to advenced
  // isInCart: boolean = false    // belongs to advenced

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

    this._ProductsDataService.getCategories().subscribe({
      next: (response)=>{
        // console.log(response);
        this.categoryData = response.data;
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

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSlideOptions: OwlOptions = {
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
                               // this is advenced ==> remove item from wichles (if he is in wichles) when add it to cart 
  addProduct(id:string): void{ // (id: string, ele: HTMLElement)
    this.overlay = true

    // belongs to advenced
    // this.isInWichLes = ele.classList.value.includes('text-red')
    // if(this.isInWichLes){
    //   this._WichLesService.removeFromWichLes(id).subscribe({
    //     next: (response)=>{
    //       // console.log(response);
    //       // this._ToastrService.success('Product has removed from your wishlist')
    //       this.wichLesData = response.data
    //       // this.overlay = false
    //     },
    //     error: (err)=>{
    //       console.log(err);
    //       // this.overlay = false
    //     }
    //   })
    // }

    this._CartService.addToCartItem(id).subscribe({
      next: (response)=>{
        // console.log(response);
        this._ToastrService.success('It has been successfully added. 🛺')

        // belongs to advenced
        // if(this.isInWichLes){ 
        //   this._ToastrService.success('The product has been removed from your wishList and has been successfully added to your cart. 🛺')
        // }else{
        //   this._ToastrService.success('It has been successfully added. 🛺')
        // }
        // after this you can make the addRemoveWichLes(...) do the opposite for cart and it will check first if the product is in product and if it's true the addRemoveWichLes(...) will removed it from cart (if you want)

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
