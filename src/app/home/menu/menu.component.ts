import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../services/constants.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  companyName;

  constructor(private constants: ConstantsService, private productService: ProductService) {
    this.companyName = constants.appname;
  }

  ngOnInit() {
  }

  test() {
     let product = this.productService.getProducts();
  }

}
