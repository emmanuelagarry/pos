import { CartFacade } from 'src/app/facades/cart.facade'
import { Router } from '@angular/router'
import { PaymentPage } from './../payment.page'
import { Subject, combineLatest, Subscription } from 'rxjs'

import { Component, OnInit, Inject } from '@angular/core'
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet'
import { scan, map, startWith, shareReplay, take } from 'rxjs/operators'

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  sub1: Subscription
  sub2: Subscription
  total$ = this.cart.total$
  tendersubect$ = new Subject<string>()
  tender$ = this.tendersubect$.pipe(
    startWith('0'),
    scan((acc, val) => {
      if (val === 'backspace') {
        acc = acc.slice(0, acc.length - 1)
        // console.log(acc)
        return acc
      }
      return acc === '0' ? val : acc + val
    }),
    shareReplay()
  )

  change$ = combineLatest([this.tender$, this.total$]).pipe(
    map(([tender, total]) => {
      const tenderAmount = parseFloat(tender) ? parseFloat(tender) : 0
      return tenderAmount - total
    })
  )

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PaymentPage>,
    private router: Router,
    private cart: CartFacade,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  ngOnInit() {}

  closeDialog() {}

  press(num: string) {
    this.tendersubect$.next(num)
  }
  closeBottomSheet() {
    this.bottomSheetRef.dismiss()
  }

  payCustomer() {
    this.sub1 = this.tender$.pipe().subscribe(item => {
      this.cart.changeTender(parseFloat(item))
    })
    this.sub2 = this.change$.pipe().subscribe(item => {
      this.cart.changeChange(item)
    })
    this.router.navigate(['/tab/receipt'])
    this.cart.checkout(this.data.paymentType, this.data.delivery)
    this.bottomSheetRef.dismiss()
  }

  ionViewDidLeave() {
    if (this.sub1) {
      this.sub1.unsubscribe()
    }
    if (this.sub2) {
      this.sub2.unsubscribe()
    }
  }
}
