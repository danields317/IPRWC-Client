import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor() { }

  ngOnInit() {
  }

  setProducts(products: Product[]) {
    this.products = products;
    var product: Product = new class implements Product {
      brand: string;
      description: string;
      id: string;
      price: number;
      productName: string;
      stock: number;
      thumbnail: string;
    };
    product.id = String(1);
    product.price = 10;
    product.brand = 'brandje';
    product.productName = 'koenkie';
    this.products.push(product);
  }



}
