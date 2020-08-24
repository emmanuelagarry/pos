import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
  ActivatedRoute,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth/auth.service'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.checkAuthState$.pipe(
      map(authState => {
        if (authState) {
          return true
        } else {
          this.router.navigate(['/tab/signup'], {
            relativeTo: this.route,
          })
          return false
        }
      })
    )
  }
}
