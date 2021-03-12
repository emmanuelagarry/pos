import { SooyahBistroPouchDb } from './../pouchdb/pouchdb.sooyah-bistro'

import { MenuItem } from './../models/menu.item.model'

import { BehaviorSubject, combineLatest } from 'rxjs'

import { Injectable } from '@angular/core'
import { map, shareReplay } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private cartItems: MenuItem[] = []
  private store = new BehaviorSubject<any[]>([])
  state$ = this.store.asObservable()

  private change = new BehaviorSubject<number>(0)
  private discount = new BehaviorSubject<number>(0)
  private tender = new BehaviorSubject<number>(0)

  private time = new BehaviorSubject<Date>(new Date())
  timesT$ = this.time.asObservable()
  change$ = this.change.asObservable()
  discount$ = this.discount.asObservable()
  tender$ = this.tender.asObservable()

  private paymentTypeAndDelivery = new BehaviorSubject<{
    payment: string
    delivery: string
  }>({ payment: null, delivery: null })

  paymentTypeAndDelivery$ = this.paymentTypeAndDelivery.asObservable()

  firstTotal$ = this.state$.pipe(
    map(state =>
      state
        .map(items => {
          return items.price as number
        })
        .reduce((pv, agg) => pv + agg, 0)
    )
  )

  total$ = combineLatest([this.firstTotal$, this.discount$]).pipe(
    map(([total, discount]) => {
      return total - (total * discount) / 100
    }),
    shareReplay()
  )

  carList$ = this.state$

  constructor(
    private poucDB: SooyahBistroPouchDb,
    private snackBar: MatSnackBar
  ) {}

  addtoCart(item: MenuItem) {
    // console.log(item);
    this.cartItems = [...this.cartItems, item]
    this.store.next(this.cartItems)
  }

  removeFromCart(obsId) {
    const index = this.cartItems.findIndex(item => item.observableId === obsId)
    // console.log(index);
    this.cartItems.splice(index, 1)
    this.store.next(this.cartItems)
  }

  removeAllFromCart() {
    this.cartItems = []
    this.store.next(this.cartItems)
  }

  async checkout(payment: string, delivery: string) {
    this.paymentTypeAndDelivery.next({ payment, delivery })
    const timestamp = new Date()
    this.time.next(timestamp)

    const array = this.cartItems
      .reduce((acc, val) => acc.concat(val.combo), [])
      .map(value => ({ name: value, count: 1 }))

    let final = array.reduce(
      (pv, cv) => {
        const dupIndex = pv.findIndex(item => item.name === cv.name)
        if (dupIndex !== -1) {
          pv[dupIndex].count = pv[dupIndex].count + 1
          return pv
        }
        return [...pv, cv]
      },
      [{ name: '', count: 1 }]
    )

    if (final.length > 1) {
      final = final.filter(name => name.name !== '')

      try {
        for (const item of final) {
          await this.poucDB.decrementMenuItems(
            `inventoryItem${item.name}`,
            item.count
          )
        }
        await this.poucDB.putOrderPouch(
          this.cartItems,
          payment,
          delivery,
          timestamp
        )
      } catch (err) {
        console.log(err)
      }

      this.snackBar.open('The Order is complete!!!', '', {
        duration: 2000,
      })
    }
  }

  changeChange(change: number) {
    this.change.next(change)
  }
  changeTender(tend: number) {
    this.tender.next(tend)
  }

  changeDiscount(disc: number) {
    this.discount.next(disc)
  }
}
