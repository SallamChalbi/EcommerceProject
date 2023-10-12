import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('')
  });

  errMsg:string = '';
  overlay: boolean = false;

  handleForm(): void{
    this.overlay = true;
    if(this.forgetForm.value.email == ''){
      this.errMsg = 'You must write an email!'
      this.overlay = false
    }else{
      this._AuthService.forgetPassword(this.forgetForm.value).subscribe({
        next: (response)=>{
           if(response.statusMsg == "success"){
             this._Router.navigate(['/verify-code']);
           }
           this.overlay = false;
        },
        error: (err)=>{
          this.errMsg = err.error.message;
          this.overlay = false;
        }
      })
    }
  }

}
