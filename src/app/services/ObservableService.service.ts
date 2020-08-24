import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  tabSubject$ = new BehaviorSubject(true)
  tab$ = this.tabSubject$.asObservable()

  delayDialogSubject$ = new BehaviorSubject(false)
  delayDialog$ = this.tabSubject$.asObservable()

  paymentTypeAndDelivery = new BehaviorSubject<{
    paymentType: string
    delivery: string
  }>({ paymentType: null, delivery: null })

  paymentTypeAndDelivery$ = this.paymentTypeAndDelivery.asObservable()
  constructor() {}
}
