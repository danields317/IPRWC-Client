import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from './services/account.service';
import {map, take} from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}



  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.loggedIn.getValue() === true) {
      return true;
    } else {
      this.navigateToHome();
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

}
