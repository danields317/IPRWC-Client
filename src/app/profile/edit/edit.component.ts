import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {ToastService} from '../../toastService/toast-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  account: Account;
  accountForm: FormGroup;
  createdForm = false;
  updating = false;
  subscription: Subscription;

  constructor(private accountService: AccountService, private toastService: ToastService) {
    this.accountService.getUserData().subscribe((data: Account) => this.updateForm(data));
  }

  updateForm(data: Account) {
    this.account = data;
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.accountForm = new FormGroup({
      accountId: new FormControl(this.account.accountId, Validators.required),
      emailAddress: new FormControl(this.account.emailAddress, [Validators.required, Validators.email]),
      firstName: new FormControl(this.account.firstName, Validators.required),
      lastName: new FormControl(this.account.lastName, Validators.required),
      city: new FormControl(this.account.city, Validators.required),
      street: new FormControl(this.account.street, Validators.required),
      houseNumber: new FormControl(this.account.houseNumber, Validators.required)
    });
    this.createdForm = true;
  }

  updateAccount() {
    this.updating = true;
    const updatedAccount: Account = {
      accountId: this.accountForm.get('accountId').value,
      firstName: this.accountForm.get('firstName').value,
      lastName: this.accountForm.get('lastName').value,
      emailAddress: this.accountForm.get('emailAddress').value,
      city: this.accountForm.get('city').value,
      street: this.accountForm.get('street').value,
      houseNumber: this.accountForm.get('houseNumber').value,
      hash: '',
      accountRole: ''
    };
    this.accountService.updatePersonalAccount(updatedAccount).subscribe(
      () => this.handleUpdate(),
      () => this.handleError()
    );
  }

  private handleUpdate() {
    this.updating = false;
    this.toastService.showSuccessToast('Account is geüpdatet.');
  }

  private handleError() {
    this.updating = false;
    this.toastService.showErrorToast('Account kon niet geüpdatet worden.');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
