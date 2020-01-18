import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private accountService: AccountService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.accountForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      accountRole: new FormControl('Customer', Validators.required)
    });
  }

  uploadAccount() {
    const account: Account = {accountId: 0,
      hash: this.accountForm.get('password').value ,
      accountRole: this.accountForm.get('accountRole').value,
      firstName: this.accountForm.get('firstName').value,
      lastName: this.accountForm.get('lastName').value,
      emailAddress: this.accountForm.get('emailAddress').value,
      city: this.accountForm.get('city').value,
      street: this.accountForm.get('street').value,
      houseNumber: this.accountForm.get('houseNumber').value
    };
    console.log(this.accountForm.get('accountRole').value);
    this.accountService.registerAdminAccount(account).subscribe(
      data => this.handleSuccess(),
      error => this.handleError()
    );
  }

  handleSuccess() {
    this.accountForm.reset();
  }

  handleError() {
    console.log('fail');
  }
}
