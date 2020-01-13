import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductList} from '../../models/productList';
import {Product} from '../../models/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  type = 'all';
  pageSize = 3;
  page = 1;
  maxPages: number;
  productList: Product[];
  shownProduct: Product;
  isLoading = false;
  productForm: FormGroup;

  constructor(private productService: ProductService) {
    this.getProducts();
    this.createForm();
  }

  ngOnInit() {
  }

  getProducts() {
    this.productService.getProducts(this.type, this.pageSize, this.page).subscribe(
      (data: ProductList) => this.manageResponse(data)
    );
  }

  manageResponse(data: ProductList) {
    this.maxPages = data.totalPages;
    this.productList = data.products;
  }

  showProduct(product: Product) {
    this.shownProduct = product;
    this.productForm.patchValue({
      id: product.id,
      productName: product.productName,
      description: product.description,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
    this.isLoading = true;
    this.productService.getProductThumbnail(this.shownProduct.id).subscribe(
      data => this.createImageFromBlob(data),
      error => this.handleNoImage()
    );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.shownProduct.thumbnail = reader.result,
        this.isLoading = false;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  handleNoImage() {
    this.shownProduct.thumbnail = '../../../assets/img/600px-No_image_available.svg.png';
    this.isLoading = false;
  }

  createForm() {
    this.productForm = new FormGroup({
      thumbnail: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
      productName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });
  }

  swapPage(amount: number) {
    this.page = this.page + amount;
    this.getProducts();
  }
}
