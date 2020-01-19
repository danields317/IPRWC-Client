import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public loggedIn = new BehaviorSubject(false);
  private account: Account;
  public accountSubject: Subject<any> = new Subject<any>();

  constructor(private httpService: HttpService, private jwtHelperService: JwtHelperService, private router: Router,
              private cartService: CartService) {
    this.autoLogin();
  }

  logUserIn(emailAddress: string, password: string) {
    return this.httpService.makePostRequest('auth', {emailAddress, password}).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    );
  }

  getUserData() {
    return this.httpService.makeGetRequest('account').pipe(
      tap( (data: Account) =>  this.setUserData(data)),
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse))
    );
  }

  setUserData(data: Account) {
    this.account = data;
    this.accountSubject.next(data);
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
    this.getUserData().subscribe();
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
    this.cartService.clearCart();
    this.loggedIn.next(false);
  }

  calculateExpirationTime(experirationDate: Date) {
    return +experirationDate - +new Date();
  }

  autoLogin() {
    if (localStorage.getItem('id_token') != null) {
      if (!this.jwtHelperService.isTokenExpired(localStorage.getItem('id_token'))) {
        this.getRefreshToken();
        this.cartService.getItemsFromStorage();
      } else {
        this.logOut();
      }
    } else {
      // this.logOut();
    }
  }

  registerNewAccount(account: Account) {
    return this.httpService.makePostRequest('account', account).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
  }

  registerAdminAccount(account: Account) {
    return this.httpService.makePostRequest('account/admin', account).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
  }

  getAccount(): Account {
    return this.account;
  }

  getAccountList(pageSize: number, page: number) {
    return this.httpService.makeGetRequest('account/all/' + pageSize + '/' + page).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
  }

  updatePersonalAccount(updatedAccount: Account) {
    return this.httpService.makePutRequest('account', updatedAccount).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
  }

  updateAccount(updatedAccount: Account) {
    return this.httpService.makePutRequest('account/' + updatedAccount.accountId, updatedAccount).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
  }

  deleteAccount(accountId: number) {
    return this.httpService.makeDeleteRequest('account/' + accountId).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)));
  }
}
