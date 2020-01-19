import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models/product';
import {OrderItem} from '../../../../models/orderItem';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  isLoading = false;
  productImage;
  isLoadingImg = false;
  product: Product;
  @Input() orderItem: OrderItem;

  constructor() { }

  ngOnInit() {
    console.log(this.orderItem.product.productName);
  }

}
