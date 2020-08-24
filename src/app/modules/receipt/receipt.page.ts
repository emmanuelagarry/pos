import { ObservableService } from '../../services/ObservableService.service'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { map, take } from 'rxjs/operators'
import { Observable, combineLatest } from 'rxjs'
import { ModalController } from '@ionic/angular'
import { AuthService } from 'src/app/services/auth/auth.service'
import { CartFacade } from 'src/app/facades/cart.facade'
import { DataSource } from '@angular/cdk/table'

import { Router } from '@angular/router'
import { Plugins } from '@capacitor/core'

export interface Transaction {
  item: string
  cost: number
}

export class TableDataSource extends DataSource<any> {
  constructor(private obserbavaleData) {
    super()
  }

  connect() {
    return this.obserbavaleData
  }
  disconnect() {}

  observableLength() {
    // return this.obserbavaleData.pipe(map(data => data.length));
  }
}

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  displayedColumns: string[] = ['name', 'qty', 'price', 'value']

  dataSource

  data$ = this.cartFacade.state$.pipe(
    map(items =>
      items
        .map(item => ({
          name: item.name,
          qty: 1,
          price: item.price,
          value: item.price,
        }))
        .reduce((pv, cv) => {
          const dupIndex = pv.findIndex(stuff => stuff.name === cv.name)
          if (dupIndex !== -1) {
            pv[dupIndex].qty = pv[dupIndex].qty + 1
            pv[dupIndex].value = pv[dupIndex].value + cv.value
            return pv
          }
          return [...pv, cv]
        }, [])
    ),
    map(item => [
      ...item,
      ...[
        { qty: ' .' },
        { qty: ' .' },
        { qty: '' },
        { qty: 'Tender', value: 0 },
        { qty: 'Discount', value: 0 },
        { qty: '.' },
        { name: 'TOTAL', value: 0 },
        { name: 'Change', vlaue: 0 },
      ],
    ])
  )

  allData$ = combineLatest([
    this.data$,
    this.cartFacade.total$,
    this.cartFacade.change$,
    this.cartFacade.discount$,
    this.cartFacade.tender$,
  ]).pipe(
    map(([main, total, change, discount, tender]) => {
      const inx = main.findIndex(name => name.name === 'TOTAL')
      const inx2 = main.findIndex(name => name.name === 'Change')
      const inx3 = main.findIndex(name => name.qty === 'Tender')
      const inx4 = main.findIndex(name => name.qty === 'Discount')
      main[inx].value = total
      main[inx2].value = change
      main[inx3].value = tender
      main[inx4].value = (total * discount) / 100
      return main
    })
  )

  /** Gets the total cost of all transactions. */
  cashinfo$: Observable<{
    name: string
    phone: string
    orderNo: string
    date: string
  }>
  cashierInfo$: Observable<{ name: string; phone: string }>
  timestamp$: Observable<{ orderNo: string; date: string }>
  constructor(
    private cartFacade: CartFacade,
    public modal: ModalController,
    private auth: AuthService,
    private router: Router,
    private tab: ObservableService
  ) {
    this.dataSource = new TableDataSource(this.allData$)

    this.timestamp$ = this.cartFacade.timesT$.pipe(
      map(time => ({
        orderNo: time.getTime().toString(),
        date: time.toLocaleDateString(),
      }))
    )
    this.cashierInfo$ = this.auth.credential$.pipe(
      map(user => {
        return user
          ? { name: user.name, phone: user.phone }
          : { name: null, phone: null }
      })
    )

    this.cashinfo$ = combineLatest([this.cashierInfo$, this.timestamp$]).pipe(
      map(([cashier, time]) => ({ ...cashier, ...time }))
    )
  }

  ngOnInit() {}

  dismiss() {
    this.router.navigate(['/tab/pos'])
    this.cartFacade.removeAllFromCart()
    this.cartFacade.changeDiscount(0)
  }
  getTotalCost() {}

  spaceAdder(theString: string, numberSuppoose: number): string {
    const numberToBeAdded = numberSuppoose - theString.length
    for (let i = 0; i <= numberToBeAdded; i++) {
      theString = theString + ' '
    }
    return theString
  }

  async print() {
    this.printReceipt()
  }

  printReceipt() {
    const { PrinterPlugin } = Plugins

    combineLatest([
      this.cartFacade.state$,
      this.cartFacade.total$,
      this.cartFacade.change$,
      this.cashinfo$,
      this.cartFacade.discount$,
      this.cartFacade.tender$,
      this.cartFacade.paymentTypeAndDelivery$,
    ])
      .pipe(
        map(([car, total, change, cashinfo, discount, tender, ptd]) => {
          return [
            (car as any[])
              .map(items => {
                return {
                  name: items.name,
                  qty: 1,
                  price: items.price,
                  value: items.price,
                }
              })
              .reduce((pv, cv) => {
                const dupIndex = pv.findIndex(stuff => stuff.name === cv.name)
                if (dupIndex !== -1) {
                  pv[dupIndex].qty = pv[dupIndex].qty + 1
                  pv[dupIndex].value = pv[dupIndex].value + cv.value
                  return pv
                }
                return [...pv, cv]
              }, []),
            total,
            change,
            cashinfo,
            discount,
            tender,
            ptd,
          ]
        }),
        map(([data, total, change, cashinfo, discount, tender, ptd]) => {
          const maxNameLength = (data as any[])
            .map(items => items.name.length)
            .reduce((pv, cv) => Math.max(pv, cv)) as number

          const maxItemPiceLengthChek = (data as any[])
            .map(items => `${items.qty}/${items.price}`.length)
            .reduce((pv, cv) => Math.max(pv, cv))
          const maxItemPiceLength =
            maxItemPiceLengthChek > 9 ? maxItemPiceLengthChek : 9

          return [
            (data as any[]).map(items => {
              items.name = this.spaceAdder(items.name, maxNameLength)
              const qtyPrice = this.spaceAdder(
                `${items.qty}/${new Intl.NumberFormat('NGN', {
                  minimumFractionDigits: 2,
                }).format(items.price)}`,
                maxItemPiceLength
              )
              return `${items.name}; ${qtyPrice}; ${new Intl.NumberFormat(
                'NGN',
                {
                  minimumFractionDigits: 2,
                }
              ).format(items.value)}`
            }) as string[],
            maxNameLength,
            maxItemPiceLength,
            total,
            change,
            cashinfo,
            discount,
            tender,
            ptd,
          ]
        }),
        take(1)
      )
      .subscribe(
        async ([
          stuff,
          maxNameLength,
          maxItemPiceLength,
          total,
          change,
          cashinfo,
          discount,
          tender,
          ptd,
        ]) => {
          let final = [
            `${this.spaceAdder(
              'NAME',
              maxNameLength as number
            )}; ${this.spaceAdder(
              'QTY/PRICE(N)',
              maxItemPiceLength as number
            )}; VALUE(N)`,
            ...(stuff as string[]),
            ` ${this.spaceAdder('', maxNameLength as number)} ${this.spaceAdder(
              'Tender',
              maxItemPiceLength as number
            )};${new Intl.NumberFormat('NGN', {
              minimumFractionDigits: 2,
            }).format(tender as number)}; ${this.spaceAdder(
              '',
              maxNameLength as number
            )} ${this.spaceAdder(
              'Discount',
              maxItemPiceLength as number
            )};${((total as number) * (discount as number)) /
              100}%; ${this.spaceAdder(
              'TOTAL',
              maxNameLength as number
            )} ${this.spaceAdder(
              '',
              maxItemPiceLength as number
            )};${new Intl.NumberFormat('NGN', {
              minimumFractionDigits: 2,
            }).format(total as number)}; ${this.spaceAdder(
              'Change',
              maxNameLength as number
            )} ${this.spaceAdder(
              '',
              maxItemPiceLength as number
            )};${new Intl.NumberFormat('NGN', {
              minimumFractionDigits: 2,
            }).format(change as number)}`,
            `${(ptd as { payment: string; delivery: string }).payment}+${
              (ptd as { payment: string; delivery: string }).delivery
            }`,
          ]

          const cashInfo = cashinfo as {
            name: string
            phone: string
            orderNo: string
            date: string
          }

          console.log(final)
          const cashInfoString = `Cashier: ${cashInfo.name};Phone: ${cashInfo.phone};Order: ${cashInfo.orderNo};Date: ${cashInfo.date}`

          final = [cashInfoString, ...final]
          console.log(cashInfoString)
          try {
            const result = await PrinterPlugin.printDocumentForBoysJoor({
              menuItem: final,
            })
          } catch {}
        }
      )
  }

  ionViewWillEnter() {
    this.tab.tabSubject$.next(false)
  }
  ionViewDidLeave() {
    this.tab.tabSubject$.next(true)
  }
}
