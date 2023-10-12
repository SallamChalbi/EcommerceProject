import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-z|A-Z][a-zA-Z0-9]{5,8}$/)])
  });

  btnHtml: string = 'Login now';
  errMsg: string = '';
  overlay:boolean = false;

  handleForm():void {
    this.btnHtml = `<i class="fa-solid fa-spinner fa-spin"></i>`
    this.overlay = true

    if(this.loginForm.valid === true){
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response)=>{
          if(response.message == "success"){
            // console.log(response)
            localStorage.setItem('_email', response.user.email)
            localStorage.setItem('_token', response.token)
            this._Router.navigate(['/home']);
            this.btnHtml = `Login now`
            this.overlay = false;
          }
        },
        error: (err)=>{
          this.overlay = false;
          this.btnHtml = `Login now`
          this.errMsg = err.error.message;
          if(this.errMsg == 'fail'){
            this.errMsg = err.error.errors.msg;
          }
        }
      })
    }
  }

}
