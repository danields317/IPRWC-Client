import {Component, Input, OnInit} from '@angular/core';
import {OrderItem} from '../../models/orderItem';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() orderItem: OrderItem;
  private product: Product;
  private productImage;
  private isLoading = true;
  private isLoadingImg = true;
  private totalPrice: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProduct(this.orderItem.productId);
    this.getProductThumbnail(this.orderItem.productId);
  }

  getProduct(id) {
    this.productService.getProduct(id).subscribe(
      (data: Product) => this.handleProduct(data)
    );
  }

  getProductThumbnail(id) {
    this.productService.getProductThumbnail(id).subscribe(
      data => this.createImageFromBlob(data),
      error => this.handleNoImage());
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.productImage = reader.result,
        this.isLoadingImg = false;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  handleProduct(data: Product) {
    this.product = data;
    this.totalPrice = this.orderItem.amount * this.product.price;
    this.isLoading = false;
  }

  handleNoImage() {
    this.productImage = '../../../assets/img/600px-No_image_available.svg.png';
    this.isLoading = false;
  }

}
