import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[a-z|A-Z][a-zA-Z0-9]{5,8}$/)]),
  });

  overlay: boolean = false;
  errMsg:string = ''

  handleForm(): void{
    if(this.resetForm.value.email == ''){
      this.errMsg = 'You must write an email!'
      this.overlay = false
    }
    else if(this.resetForm.valid){
      this.overlay = true;
      this._AuthService.resetPassword(this.resetForm.value).subscribe({
        next: (response)=>{
          // console.log(response)
          localStorage.setItem('_email', this.resetForm.get('email')?.value)
          localStorage.setItem('_token', response.token)
          this._Router.navigate(['/home']);
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
