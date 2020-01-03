import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public loggedIn = new BehaviorSubject(false);

  constructor(private httpService: HttpService, private jwtHelperService: JwtHelperService, private router: Router) {
    this.autoLogin();
  }

  createNewAccount() {

  }

  logUserIn(emailAddress: string, password: string) {
    return this.httpService.makePostRequest('auth', {emailAddress, password}).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    );
  }

  getUserData() {
    return this.httpService.makeGetRequest('account').pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    );
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }

  setJwtInformation(token) {
    token = token.jsonToken;
    const timeTillRefresh = this.calculateExpirationTime(this.jwtHelperService.getTokenExpirationDate(token));
    localStorage.setItem('id_token', token);
    this.loggedIn.next(true);
    setTimeout(() => this.getRefreshToken(), timeTillRefresh - 60000);
  }

  getRefreshToken() {
    this.httpService.makeGetRequest('auth/refresh').pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    ).subscribe(data => this.setJwtInformation(data), errorResponse => this.logOut()
    );
  }

  logOut() {
    localStorage.removeItem('id_token');
    this.router.navigate(['']);
    this.loggedIn.next(false);
  }

  calculateExpirationTime(experirationDate: Date) {
    return +experirationDate - +new Date();
  }

  autoLogin() {
    if (localStorage.getItem('id_token') != null) {
      if (!this.jwtHelperService.isTokenExpired(localStorage.getItem('id_token'))) {
        this.getRefreshToken();
      } else {
        this.logOut();
      }
    } else {
      this.logOut();
    }
  }
}
