import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {error} from 'util';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService, private jwtHelperService: JwtHelperService) { }

  createNewAccount() {

  }

  logUserIn(emailAddress: string, password: string) {
    return  this.httpService.makePostRequest('auth', {emailAddress, password}).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    );
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }

  setJwtInformation(token) {
    token = token.jsonToken;
    console.log(this.calculateExpirationTime(this.jwtHelperService.getTokenExpirationDate(token)));
    const timeTillRefresh = this.calculateExpirationTime(this.jwtHelperService.getTokenExpirationDate(token));
    localStorage.setItem('id_token', token);
    setTimeout(() => this.getRefreshToken(), timeTillRefresh - 60000);
  }

  getRefreshToken() {
    console.log('start Refresh');
    this.httpService.makeGetRequest('auth/refresh').pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    ).subscribe(data => this.setJwtInformation(data), errorResponse => this.forceLogOut()
    );
  }

  forceLogOut() {
    console.log('fail');
  }

  calculateExpirationTime(experirationDate: Date) {
    return +experirationDate - +new Date();
  }

  isLoggedIn() {

  }


}
