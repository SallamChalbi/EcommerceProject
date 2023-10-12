import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  verifyForm: FormGroup = new FormGroup({
    resetCode: new FormControl('')
  });

  errMsg:string = ''
  overlay: boolean = false;

  handleForm(): void{
    this.overlay = true;
    if(this.verifyForm.value.resetCode == ''){
      this.errMsg = 'You must write the code!'
      this.overlay = false
    }else{
      this._AuthService.verifyCode(this.verifyForm.value).subscribe({
        next: (response)=>{
           if(response.status == "Success"){
            this._Router.navigate(['/reset-password']);
           }
           this.overlay = false;
        },
        error: (err)=>{
          if(err.error.statusMsg == "fail"){
            this.errMsg = "the code isn't valid";
          }
          this.overlay = false;
        }
      })
    } 
  }
}
