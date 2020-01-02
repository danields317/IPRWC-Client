import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {HttpService} from '../../services/http.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;
  productImage;
  isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductThumbnail();
  }

  getProductThumbnail() {
    this.productService.getProductThumbnail(this.product.id).subscribe(
      data => this.createImageFromBlob(data),
      error => this.handleNoImage());
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.productImage = reader.result,
      this.isLoading = false;
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
