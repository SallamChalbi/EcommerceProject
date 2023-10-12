import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WichListComponent } from './components/wich-list/wich-list.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CuttextPipe } from './cuttext.pipe';
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SearchPipe } from './search.pipe';
import { HandlehttpInterceptor } from './interceptors/handlehttp.interceptor';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    WichListComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavbarAuthComponent,
    NavbarBlankComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    CuttextPipe,
    ProductDetailsComponent,
    CheckOutComponent,
    AllordersComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    ModalModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HandlehttpInterceptor, multi: true},
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
