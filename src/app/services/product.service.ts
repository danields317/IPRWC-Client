import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../models/product';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) { }

  getProducts(pageSize, page) {
    return this.httpService.makeGetRequest('product/all/' + pageSize + '/' + page);
  }

  getProductThumbnail(id) {
    return this.httpService.makeGetBlobRequest('product/' + id + '/thumbnail')
      .pipe(catchError(error => this.handleError(error)));
  }

  handleError(data) {
    return throwError(data);
  }

}
