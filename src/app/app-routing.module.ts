import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WichListComponent } from './components/wich-list/wich-list.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: BlankLayoutComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'cart', component: CartComponent, canActivate: [authGuard]},
    {path: 'wichList', component: WichListComponent, canActivate: [authGuard]},
    {path: 'products', component: ProductsComponent, canActivate: [authGuard]},
    {path: 'categories', component: CategoriesComponent, canActivate: [authGuard]},
    {path: 'brands', component: BrandsComponent, canActivate: [authGuard]},
    {path: 'allorders', component: AllordersComponent, canActivate: [authGuard]},
    {path: 'ProductDetails/:id', component: ProductDetailsComponent, canActivate: [authGuard]},
    {path: 'check-out/:id', component: CheckOutComponent, canActivate: [authGuard]},
  ]},

  {path: '', component: AuthLayoutComponent, children: [
    {path: '', component: LoginComponent},
    {path: 'sign-in', component: LoginComponent},
    {path: 'sign-up', component: RegisterComponent},
    {path: 'forget-password', component: ForgetPasswordComponent},
    {path: 'verify-code', component: VerifyCodeComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
  ]},
  
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
