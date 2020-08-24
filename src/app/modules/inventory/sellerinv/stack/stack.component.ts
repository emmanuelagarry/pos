import { PouchFacade } from 'src/app/facades/facade.pouch'

import { Component, OnInit, Input } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { ModalController } from '@ionic/angular'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
})
export class StackComponent implements OnInit {
  constructor(
    public modalCtr: ModalController,
    private facade: PouchFacade,
    private snackBar: MatSnackBar
  ) {}
  @Input() data: string[]

  inventoryAdd$: Observable<any[]>

  ngOnInit() {
    this.inventoryAdd$ = new BehaviorSubject<string[]>(this.data)
      .asObservable()
      .pipe(
        map(stock => {
          const myStock = stock.map(item => ({ name: item, amount: 1 }))

          return myStock.reduce((prev, curv) => {
            const dupIndex = prev.findIndex(item => item.name === curv.name)
            if (dupIndex !== -1) {
              prev[dupIndex].amount = prev[dupIndex].amount + 1
              return prev
            }
            return [...prev, curv]
          }, [])
        })
      )
  }

  close() {
    this.modalCtr.dismiss()
  }

  finish() {
    this.inventoryAdd$.pipe(take(1)).subscribe(items => {
      items.forEach(async item => {
        await this.facade.editStock(item.name, item.amount)
      })

      this.snackBar.open('Done', '', {
        duration: 2000,
      })
      this.modalCtr.dismiss({
        dismissed: true,
      })
    })
  }

  clear() {
    this.modalCtr.dismiss({
      dismissed: true,
    })
  }
}
