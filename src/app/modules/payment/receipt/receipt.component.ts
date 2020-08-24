import { AuthService } from './../../../services/auth/auth.service'
import { ModalController, AlertController } from '@ionic/angular'
import { map } from 'rxjs/operators'
import { combineLatest, Observable } from 'rxjs'
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { CartFacade } from 'src/app/facades/cart.facade'
import { DataSource } from '@angular/cdk/table'
import { Plugins } from '@capacitor/core'

// declare var Capacitor
// const { PrinterPlugin } = Capacitor.Plugins

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
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  @ViewChild('screen', { static: true }) screenRef: ElementRef
  @ViewChild('myReceipt', { static: true })
  myReceiptRef: ElementRef
  @ViewChild('link', { static: true }) linkRef: ElementRef
  displayedColumns: string[] = ['name', 'qty', 'price', 'value']

  dataSource

  hybrid$ = [{ qty: 'Subtotal', value: 0 }]
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
        { qty: 'Subtotal', value: 0 },
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
  ]).pipe(
    map(([main, total, change]) => {
      const inx = main.findIndex(name => name.name === 'TOTAL')
      const inx2 = main.findIndex(name => name.name === 'Change')
      main[inx].value = total
      main[inx2].value = change
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
    private auth: AuthService
  ) {
    this.dataSource = new TableDataSource(this.allData$)

    this.timestamp$ = this.cartFacade.timesT$.pipe(
      map(time => ({
        orderNo: time.getTime().toString(),
        date: time.toLocaleDateString(),
      }))
    )
    this.cashierInfo$ = this.auth.credential$.pipe(
      map(user => ({
        name: user.name,
        phone: user.phone,
      }))
    )

    this.cashinfo$ = combineLatest([this.cashierInfo$, this.timestamp$]).pipe(
      map(([cashier, time]) => ({ ...cashier, ...time }))
    )
  }

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss()
    this.cartFacade.removeAllFromCart()
  }
  getTotalCost() {}

  async print() {
    // const { PrinterPlugin } = Plugins
    // try {
    //   const result = await PrinterPlugin.print()
    //   alert(`${result.printer}`)
    // } catch (error) {
    //   alert(`${error}`)
    // }
  }
}
