import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderItem} from '../models/orderItem';
import {CartService} from '../services/cart.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: OrderItem[] = [];
  subscription: Subscription;

  constructor(private cartService: CartService, private router: Router) {
    this.subscription = this.cartService.cartItems.subscribe(data => this.cartItems = data);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onOrder() {
    this.router.navigate(['/order']);
  }
}
