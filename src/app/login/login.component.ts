import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loggingIn = false;
  logInFailed = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this.logInFailed = false;
    this.loggingIn = true;
    this.accountService.logUserIn(this.loginForm.get('emailAddress').value, this.loginForm.get('password').value).subscribe(
      data => this.handleLogin(data),
      errorResponse => this.handleFail()
    );
  }

  handleLogin(token) {
    this.accountService.setJwtInformation(token);
    this.router.navigate(['']);
    this.loggingIn = false;
  }

  handleFail() {
    this.logInFailed = true;
    this.loggingIn = false;
  }
}
