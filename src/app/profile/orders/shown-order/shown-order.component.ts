import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-shown-order',
  templateUrl: './shown-order.component.html',
  styleUrls: ['./shown-order.component.css']
})
export class ShownOrderComponent implements OnInit {

  @Input() shownOrder: Order;

  constructor() {
  }

  ngOnInit() {
  }

}
