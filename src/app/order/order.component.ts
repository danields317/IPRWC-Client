import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {CartService} from '../services/cart.service';
import {OrderService} from '../services/order.service';
import {Order} from '../models/order';
import {Account} from '../models/account';
import {OrderItem} from '../models/orderItem';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  account: Account;
  date = this.getMinimumDeliveryDate();
  cartItems: OrderItem[];
  error = false;
  ordering = false;

  constructor(private accountService: AccountService, private cartService: CartService,
              private orderService: OrderService, private router: Router) {
    this.createForm();
    this.cartService.cartItems.subscribe(data => this.cartItems = data);
  }

  ngOnInit() {
    this.accountService.getUserData().subscribe((data: Account) => this.account = data);
  }

  createForm() {
    this.orderForm = new FormGroup({
      deliveryCity: new FormControl(null, Validators.required),
      deliveryAddress: new FormControl(null, Validators.required),
      deliveryNumber: new FormControl(null, Validators.required),
      deliveryDate: new FormControl(null, Validators.required)
    });
  }

  getMinimumDeliveryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return  {year: date.getFullYear(), month: date.getMonth() + 2, day: date.getDate()};
  }

  onSubmit() {
    this.placeOrder();
  }

  placeOrder() {
    const ngbDate: NgbDateStruct = this.orderForm.get('deliveryDate').value;
    const date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    const jsonDate = date.toJSON();
    const order: Order = {id: null, accountId: this.account.accountId, deliveryCity: this.orderForm.get('deliveryCity').value,
    deliveryAddress: this.orderForm.get('deliveryAddress').value, deliveryNumber: this.orderForm.get('deliveryNumber').value,
    deliveryDate: jsonDate, items: this.cartItems };
    this.orderService.placeOrder(order).subscribe(
      data => this.handleSuccess(),
      errorResponse => this.handleError()
    );
  }

  private handleSuccess() {
    this.cartService.clearCart();
    this.router.navigate(['/confirmation']);
  }

  private handleError() {
    this.error = true;
  }
}
