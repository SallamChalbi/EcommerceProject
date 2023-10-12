import { Component, OnInit, TemplateRef } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  constructor(private _BrandService:BrandService, private _BsModalService:BsModalService){}

  allBrandsData: any = null;
  brandData: any = null;
  overlay:boolean = false;

  modalRef!: BsModalRef;

  ngOnInit(): void {
    this.overlay = true
    this._BrandService.getAllBrands().subscribe({
      next: (response)=>{
        // console.log(response);
        this.allBrandsData = response.data
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  getBrand(brandId: string): void{
    this.overlay = true
    this._BrandService.getSpecificBrand(brandId).subscribe({
      next: (response)=>{
        // console.log(response);
        this.brandData = response.data
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._BsModalService.show(template);
 }
}
