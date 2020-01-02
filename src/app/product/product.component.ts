import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = {} as Product;
  productImage;
  isLoading = true;
  amount: number;
  fullStock: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getProduct(id);
    this.getProductThumbnail(id);
  }

  getProduct(id) {
    this.productService.getProduct(id).subscribe(
      (data: Product) => this.product = data
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

  addToCart() {
    console.log(this.amount);
  }

  checkAmount($event: any) {
    if (this.amount > this.product.stock) {
      this.amount = this.product.stock;
      this.fullStock = true;
    } else if (this.amount < 1) {
      this.amount = 1;
      this.fullStock = false;
    } else {
      this.fullStock = false;
    }
  }
}
