import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) { }

  getProducts() {
    return this.httpService.makeGetRequest('product/15');
  }
}
