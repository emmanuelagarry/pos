import { map } from 'rxjs/operators'
import { AuthService } from './../services/auth/auth.service'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.credential$.pipe(
      map(credential => {
        if (credential) {
          if (
            credential.credential === 'admin' ||
            credential.credential === 'superuser' ||
            credential.credential === 'cashier'
          ) {
            return true
          }
        }
        alert('Only admins allowed here')

        return false
      })
    )
  }
}
