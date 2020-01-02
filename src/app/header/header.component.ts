import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../services/constants.service';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyName;
  loggedIn;

  constructor(private constants: ConstantsService, private accountService: AccountService) {
    this.companyName = constants.appname;
    this.accountService.isLoggedIn();
  }

  ngOnInit() {
  }

}
