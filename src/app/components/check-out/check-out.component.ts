import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _OrderService:OrderService){}

  cardId: any;
  overlay:boolean = false;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.cardId = param.get('id')
        // console.log(this.cardId)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(002)?01[0-25][0-9]{8}$/)]),
    city: new FormControl('', [Validators.required]),
  });

  handleForm(id: string): void{
    // console.log(this.checkOutForm.value)
    // console.log(this.cardId)
    this.overlay = true

    if(this.checkOutForm.valid == true){
      this._OrderService.checkOut(id, this.checkOutForm.value).subscribe({
        next: (response)=>{
          window.open(response.session.url, '_self')
          this.overlay = false
        },
        error: (err)=>{
          console.log(err)
          this.overlay = false
        }
      })
    }
  }

}
