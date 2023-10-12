import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-z|A-Z][a-zA-Z0-9]{5,8}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(002)?01[0-25][0-9]{8}$/)])
  } , { validators: [ this.confirmPassword ]} as FormControlOptions );

  confirmPassword(group: FormGroup): void{
    const password = group.get('password')
    const rePassword = group.get('rePassword')

    if(rePassword?.value === ''){
      rePassword?.setErrors({ required: true })
    }
    else if(password?.value !== rePassword?.value){
      rePassword?.setErrors({ notEqual: true })
    }

  }

  btnHtml: string = 'Register now';
  errMsg: string = '';
  overlay:boolean = false;

  handleForm():void {
    this.btnHtml = `<i class="fa-solid fa-spinner fa-spin"></i>`
    this.overlay = true

    if(this.registerForm.valid == true){
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response)=>{
          if(response.message == "success"){
            this._Router.navigate(['/sign-in']);
            this.overlay = false;
            this.btnHtml = `Register now`
          }
        },
        error: (err)=>{
          this.overlay = false;
          this.btnHtml = `Register now`
          this.errMsg = err.error.message;
          if(this.errMsg == 'fail'){
            this.errMsg = err.error.errors.msg;
          }
        }
      })
    }
  }

}
