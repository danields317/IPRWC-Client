import { Component, OnInit } from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {OrderList} from '../../../models/orderList';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css']
})
export class PlacedOrdersComponent implements OnInit {

  pageSize = 5;
  page = 1;
  orderList: Order[];
  maxPages: number;
  shownOrder: Order;

  constructor(private orderService: OrderService) {
    this.getOrders();
  }

  ngOnInit() {
  }

  getOrders() {
    this.orderService.getOrderList(this.pageSize, this.page).subscribe(
      (data: OrderList) => this.manageResponse(data),
      error => console.log('fail')
    );
  }

  manageResponse(data: OrderList) {
    this.maxPages = data.totalPages;
    this.orderList = data.orders;
  }


  showOrder(order: Order) {
    this.orderService.getOrder(order.id).subscribe(
      (data: Order) => this.shownOrder = data,
      error => console.log('fail')
    );
  }

  swapPage(amount: number) {
    this.page = this.page + amount;
    this.getOrders();
  }

  removeOrder(id: number) {
    this.orderService.removeOrder(id).subscribe(
      () => this.manageDelete(),
      error => console.log('fail')
    );
  }

  manageDelete() {
    this.shownOrder = null;
    this.getOrders();
  }
}
