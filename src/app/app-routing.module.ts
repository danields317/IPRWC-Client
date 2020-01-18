import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductsPageComponent} from './products-page/products-page.component';
import {ProductComponent} from './product/product.component';
import {LoginComponent} from './login/login.component';
import {CartComponent} from './cart/cart.component';
import {OrderComponent} from './order/order.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';
import {GuardService} from './guard-service';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'products/:type', component: ProductsPageComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'admin', canActivate: [GuardService], component: AdminComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
