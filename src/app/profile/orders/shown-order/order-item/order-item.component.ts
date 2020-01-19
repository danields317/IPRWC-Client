import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../../../models/product';
import {OrderItem} from '../../../../models/orderItem';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit, OnChanges {
  isLoading = true;
  productImage;
  isLoadingImg = true;
  product: Product;
  @Input() orderItem: OrderItem;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.orderItem != null) {
      this.getProduct();
    }
  }

  getProduct() {
    this.productService.getProduct(this.orderItem.productId).subscribe(
      (data: Product) => this.handleProductGet(data)
  );
  }

  handleProductGet(data: Product) {
    this.product = data;
    this.getProductThumbnail(data.id);
    this.isLoading = false;
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

  handleNoImage() {
    this.productImage = '../../../assets/img/600px-No_image_available.svg.png';
    this.isLoading = false;
  }

}
