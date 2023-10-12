import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit{
  allOrdersUsers: any;
  constructor(private _OrderService:OrderService){}

  userEmail: string | null = ''
  userOrders: any = null
  empty:boolean = true;
  overlay:boolean = false;

  ngOnInit(): void{
    this._OrderService.getAllOrders().subscribe({
      next: (response)=>{
        this.userEmail = localStorage.getItem('_email')
        this.userOrders = response.data.filter( (item: any) => item.user.email == this.userEmail)
        this.empty =  this.userOrders.length == 0
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}
