import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../services/account.service';
import {Subscription} from 'rxjs';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product = {} as Product;
  productImage;
  isLoading = true;
  amount: number;
  fullStock: boolean;
  loggedIn;
  subscription: Subscription;
  inCart: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private accountService: AccountService, private cartService: CartService) {
    this.subscription = this.accountService.loggedIn.subscribe(data => this.loggedIn = data);
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getProduct(id);
    this.getProductThumbnail(id);
    this.inCart = this.cartService.isItemInCart(id);
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
    this.cartService.addItem(this.product.id, this.amount);
    this.inCart = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
