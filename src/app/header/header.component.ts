import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {Account} from '../models/account';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';

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

  constructor(private accountService: AccountService, public router: Router) {
    this.companyName = environment.appName;
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

  toProfile() {
    this.router.navigate(['/profile']);
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
