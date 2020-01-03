import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../services/constants.service';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  companyName;
  loggedIn;

  constructor(private constants: ConstantsService, private router: Router, private accountService: AccountService) {
    this.companyName = this.constants.appname;
  }

  ngOnInit() {
    this.accountService.loggedIn.subscribe(data => this.loggedIn = data);
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toProducts() {
    this.router.navigate(['/products', 'all']);
  }

  logOut() {
    this.accountService.logOut();
  }
}
