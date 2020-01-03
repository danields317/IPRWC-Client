import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../services/constants.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  companyName;
  prod: Product;
  image;

  constructor(private constants: ConstantsService, private productService: ProductService, private router: Router) {
    this.companyName = constants.appname;
  }

  ngOnInit() {
  }

  toMensWatches() {
    this.router.navigate(['/products', 'men']);
  }

  toLadiesWatches() {
    this.router.navigate(['/products', 'ladies']);
  }

  toSmartWatches() {
    this.router.navigate(['/products', 'smartwatch']);
  }
}
