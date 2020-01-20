import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountService} from './services/account.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.getAccount() != null) {
      if (this.accountService.getAccount().accountRole === 'Admin') {
        return true;
      } else {
        this.navigateToHome();
      }
    } else {
      this.navigateToHome();
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
