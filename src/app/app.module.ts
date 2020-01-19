import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './home/menu/menu.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductComponent } from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { OrderComponent } from './order/order.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AdminComponent } from './admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductUploadComponent } from './admin/product-upload/product-upload.component';
import { PlacedOrdersComponent } from './admin/placed-orders/placed-orders.component';
import { AccountEditComponent } from './admin/account-edit/account-edit.component';
import { AccountAddComponent } from './admin/account-add/account-add.component';
import {GuardService} from './guard-service';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import {ToastComponent} from './toastService/toasts-container';
import { OrdersComponent } from './profile/orders/orders.component';
import { ShownOrderComponent } from './profile/orders/shown-order/shown-order.component';
import { OrderItemComponent } from './profile/orders/shown-order/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ProductsPageComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductComponent,
    CartComponent,
    CartItemComponent,
    OrderComponent,
    ConfirmationComponent,
    AdminComponent,
    ProductEditComponent,
    ProductUploadComponent,
    PlacedOrdersComponent,
    AccountEditComponent,
    AccountAddComponent,
    ProfileComponent,
    EditComponent,
    ToastComponent,
    OrdersComponent,
    ShownOrderComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        },
        whitelistedDomains: ['localhost:8080'],
        throwNoTokenError: false
    }
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
