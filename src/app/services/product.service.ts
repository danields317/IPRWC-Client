import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../models/product';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) { }

  getProducts(type, pageSize, page) {
    return this.httpService.makeGetRequest('product/' + type + '/' + pageSize + '/' + page)
      .pipe(catchError(error => this.handleError(error)));
  }

  getProductThumbnail(id) {
    return this.httpService.makeGetBlobRequest('product/' + id + '/thumbnail')
      .pipe(catchError(error => this.handleError(error)));
  }

  getProduct(id: string) {
    return this.httpService.makeGetRequest('product/' + id)
      .pipe(catchError(error => this.handleError(error)));
  }

  updateProduct(product: FormData) {
    return this.httpService.makePutRequest('product', product)
      .pipe(catchError(error => this.handleError(error)));
  }

  uploadProject(product) {
    return this.httpService.makePostRequest('product', product)
      .pipe(catchError(error => this.handleError(error)));
  }

  handleError(data) {
    return throwError(data);
  }

  deleteProduct(id) {
    return this.httpService.makeDeleteRequest('product/' + id);
  }
}
