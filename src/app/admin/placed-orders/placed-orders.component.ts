import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';
import {OrderList} from '../../models/orderList';
import {ToastService} from '../../toastService/toast-service';

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
  deleting = false;

  constructor(private orderService: OrderService, private toastService: ToastService) {
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
    this.deleting = true;
    this.orderService.removeOrder(id).subscribe(
      () => this.manageDelete(),
      error => this.handleFail()
    );
  }

  manageDelete() {
    this.toastService.showSuccessToast('Bestelling verwijderd.');
    this.shownOrder = null;
    this.getOrders();
  }

  handleFail() {
    this.toastService.showErrorToast('Kon bestelling niet verwijderen.');
  }

}
