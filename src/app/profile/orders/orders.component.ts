import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderList} from '../../models/orderList';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';
import {ShownOrderComponent} from './shown-order/shown-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild(ShownOrderComponent, {static: true}) shownOrderComponent: ShownOrderComponent;
  pageSize = 5;
  page = 1;
  maxPages: number;
  orderList: Order[];

  constructor(private orderService: OrderService) {
    this.getPersonalOrders();
  }

  ngOnInit() {
  }

  swapPage(amount: number) {
    this.page = this.page + amount;
    this.getPersonalOrders();
  }

  getPersonalOrders() {
    this.orderService.getPersonalOrderList(this.pageSize, this.page).subscribe(
      (data: OrderList) => this.manageResponse(data),
      error => console.log('fail')
    );
  }

  manageResponse(data: OrderList) {
    this.maxPages = data.totalPages;
    this.orderList = data.orders;
  }


  showOrder(order: Order) {
    this.shownOrderComponent.shownOrder = order;
    this.shownOrderComponent.getFullOrder();
  }
}
