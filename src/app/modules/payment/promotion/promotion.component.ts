import { CartFacade } from 'src/app/facades/cart.facade'
import { AuthService } from 'src/app/services/auth/auth.service'
import { BehaviorSubject } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { PaymentPage } from '../payment.page'
import { take, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit {
  private loadingSubject$ = new BehaviorSubject(false)
  loading$ = this.loadingSubject$.asObservable()

  constructor(
    public matDialogRef: MatDialogRef<PaymentPage>,
    private auth: AuthService,
    private cart: CartFacade
  ) {}

  ngOnInit() {}

  formSubmit(event) {
    this.loadingSubject$.next(true)
    this.auth
      .checkForPromo(event.target.elements[0].value)
      .valueChanges()
      .pipe(
        catchError(() => []),
        take(1)
      )
      .subscribe(item => {
        if (item) {
          this.cart.changeDiscount(item.percentage)
          alert('Promo code valid')
          this.matDialogRef.close()
        } else {
          this.cart.changeDiscount(0)
          alert('Promo code is invalid')
          this.loadingSubject$.next(false)
        }
      })
  }

  ionViewDidLeave() {
    this.loadingSubject$.next(false)
  }
}
