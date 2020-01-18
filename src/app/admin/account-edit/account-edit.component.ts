import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {AccountList} from '../../models/accountList';
import {Account} from '../../models/account';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  pageSize = 5;
  page = 1;
  maxPages: number;
  accountList: Account[];
  shownAccount: Account;
  accountForm: FormGroup;

  constructor(private accountService: AccountService) {
    this.createForm();
    this.getAccounts();
  }

  ngOnInit() {
  }

  getAccounts() {
    this.accountService.getAccountList(this.pageSize, this.page).subscribe(
      (data: AccountList) => this.manageResponse(data)
    );
  }

  manageResponse(data: AccountList) {
    this.maxPages = data.totalPages;
    this.accountList = data.accounts;
  }

  createForm() {
    this.accountForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required)
    });
  }



  swapPage(amount: number) {
    this.page = this.page + amount;
    this.getAccounts();
  }

  showAccount(account: Account) {
    this.shownAccount = account;
    this.accountForm.patchValue({
      emailAddress: account.emailAddress,
      firstName: account.firstName,
      lastName: account.lastName,
      city: account.city,
      street: account.street,
      houseNumber: account.houseNumber
    });
  }

  updateAccount() {
    const updatedAccount: Account = {
      accountId: this.shownAccount.accountId,
      firstName: this.accountForm.get('firstName').value,
      lastName: this.accountForm.get('lastName').value,
      emailAddress: this.accountForm.get('emailAddress').value,
      city: this.accountForm.get('city').value,
      street: this.accountForm.get('street').value,
      houseNumber: this.accountForm.get('houseNumber').value,
      hash: '',
      accountRole: ''
    };
    this.accountService.updateAccount(updatedAccount).subscribe(
      data => this.handleUpdate(true),
      error => console.log('fail')
    );
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.shownAccount.accountId).subscribe(
      data => this.handleUpdate(true),
      error => console.log('fail')
    );
  }

  handleUpdate(removeShown: boolean) {
    if (removeShown === true) {
      this.shownAccount = null;
    }
    this.getAccounts();
  }
}
