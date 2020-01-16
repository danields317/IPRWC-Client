import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {buffer} from 'rxjs/operators';
import validate = WebAssembly.validate;
import {AccountService} from '../services/account.service';
import {Account} from '../models/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registering = false;

  constructor(private accountService: AccountService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      passwordCheck: new FormControl(),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required)
    });
  }

  checkSamePassword() {
    if (this.registerForm.get('password').value === this.registerForm.get('passwordCheck').value) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.registering = true;
    if (!this.checkSamePassword()) {
      return;
    }
    const account: Account = {accountId: 0, hash: this.registerForm.get('password').value , accountRole: 'Customer',
      firstName: this.registerForm.get('firstName').value, lastName: this.registerForm.get('lastName').value,
      emailAddress: this.registerForm.get('emailAddress').value,
      city: this.registerForm.get('city').value, street: this.registerForm.get('street').value,
      houseNumber: this.registerForm.get('number').value
    };
    this.accountService.registerNewAccount(account).subscribe(data => this.accountCreated(),
       errorResponse => this.accountFailed());
  }

  private accountCreated() {
    this.registering = false;
  }

  private accountFailed() {
    console.log('failed');
    this.registering = false;
  }
}
