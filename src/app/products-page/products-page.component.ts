import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {ProductList} from '../models/productList';
import {ProductListComponent} from '../product-list/product-list.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  @ViewChild(ProductListComponent, {static: true}) productList: ProductListComponent;

  pageSize = 10;
  currentPage = 1;
  maxPages;
  type;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.type, this.pageSize, this.currentPage).subscribe((data: ProductList) => this.manageResponse(data));
  }

  manageResponse(data: ProductList) {
    this.maxPages = data.totalPages;
    this.productList.setProducts(data.products);
  }

}
