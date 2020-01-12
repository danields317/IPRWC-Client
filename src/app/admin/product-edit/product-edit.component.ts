import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductList} from '../../models/productList';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  type = 'all';
  pageSize = 10;
  page = 1;
  maxPages: number;
  productList: Product[];

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts() {
    this.productService.getProducts(this.type, this.pageSize, this.page ).subscribe((data: ProductList) => this.manageResponse(data));
  }

  manageResponse(data: ProductList) {
    this.maxPages = data.totalPages;
    this.productList = data.products;
  }

}
