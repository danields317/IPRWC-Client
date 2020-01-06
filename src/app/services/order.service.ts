import { Injectable } from '@angular/core';
import {Order} from '../models/order';
import {HttpService} from './http.service';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) { }

  placeOrder(order: Order) {
    return this.httpService.makePostRequest('order', order).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    );
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
