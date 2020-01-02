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
      catchError((errorResponse: HttpErrorResponse) => this.handleError(error))
    );
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }

  setJwtInformation(token) {
    token = token.jsonToken;
    localStorage.setItem('id_token', token);
  }
}
