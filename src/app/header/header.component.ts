import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConstantsService} from '../services/constants.service';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {Account} from '../models/account';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  companyName;
  loggedIn;
  admin = false;
  isCollapsed = true;
  loginSub: Subscription;
  accountSub: Subscription;

  constructor(private constants: ConstantsService, private accountService: AccountService, private router: Router) {
    this.companyName = constants.appname;
  }

  ngOnInit() {
    this.loginSub = this.accountService.loggedIn.subscribe(data => this.loggedIn = data);
    this.accountSub = this.accountService.accountSubject.subscribe(
      (data: Account) => this.checkRole(data)
    );
  }

  checkRole(data: Account) {
    if (data.accountRole === 'Admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  toHome() {
    this.router.navigate(['']);
  }

  toProducts() {
    this.router.navigate(['/products', 'all']);
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toCart() {
    this.router.navigate(['/cart']);
  }

  logOut() {
    this.admin = false;
    this.accountService.logOut();
  }

  toAdmin() {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
    this.accountSub.unsubscribe();
  }
}
