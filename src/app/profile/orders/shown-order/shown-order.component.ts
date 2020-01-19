import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-shown-order',
  templateUrl: './shown-order.component.html',
  styleUrls: ['./shown-order.component.css']
})
export class ShownOrderComponent implements OnInit {

  @Input() shownOrder: Order;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
  }

  getFullOrder() {
    this.orderService.getPersonalOrder(this.shownOrder.id).subscribe(
      (data: Order) => this.shownOrder = data
    );
  }

}
