import {Component, Input, OnInit} from '@angular/core';
import {ConstantsService} from '../services/constants.service';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyName;
  loggedIn;

  constructor(private constants: ConstantsService, private accountService: AccountService, private router: Router) {
    this.companyName = constants.appname;
  }

  ngOnInit() {
    this.accountService.loggedIn.subscribe(data => this.loggedIn = data);
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
    this.accountService.logOut();
  }
}
