import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  constructor(private _ProductsDataService:ProductsDataService){}

  categoryData: any[] = [];
  subCategoriesData: string[] = []
  categoryName: string = ''
  overlay:boolean = false;

  ngOnInit(): void {
    this.overlay = true
    this._ProductsDataService.getCategories().subscribe({
      next: (response)=>{
        // console.log(response);
        this.categoryData = response.data;
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }

  getAllSubCategories(catId: string, catName: string): void{
    this.overlay = true
    this._ProductsDataService.getSubCategoriesOfCategory(catId).subscribe({
      next: (response)=>{
        // console.log(response);
        this.categoryName = catName;
        this.subCategoriesData = response.data.map((item: any)=> item.name)
        this.overlay = false
      },
      error: (err)=>{
        console.log(err);
        this.overlay = false
      }
    })
  }
}
