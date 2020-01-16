import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {ProductList} from '../models/productList';
import {ProductListComponent} from '../product-list/product-list.component';
import {ActivatedRoute, Params} from '@angular/router';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  @ViewChild(ProductListComponent, {static: true}) productList: ProductListComponent;

  pageSize = 6;
  currentPage = 1;
  maxPages;
  type;
  subscription: Subscription;
  background = 'url(../../assets/img/wrist-watches.jpg)';
  text: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.handlePageChange(params.type);
      }
    );
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

  handlePageChange(type) {
    this.type = type;
    this.getCardContent(this.type);
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCardContent(type) {
    if (type === 'all') {
      this.background = 'url(../../assets/img/wrist-watches.jpg)';
      this.text = 'Alle horloges';
    } else if (type === 'men') {
      this.background = 'url(../../assets/img/wristwatch-1149669_1280.jpg)';
      this.text = 'Heren horloges';
    } else if (type === 'ladies') {
      this.background = 'url(../../assets/img/womanOnTrunk.jpg)';
      this.text = 'Dames horloges';
    } else if (type === 'smartwatch') {
      this.background = 'url(../../assets/img/smartWatches.jpg)';
      this.text = 'Smart watches';
    }
  }

}
