import { SooyahOrder } from './../models/sooyah.order'
import { MenuItem } from './../models/menu.item.model'
import { InventoryItem } from './../models/inventory.item.model'
import { Injectable } from '@angular/core'
import { SooyahBistroPouchDb } from '../pouchdb/pouchdb.sooyah-bistro'
import { from, Observable, BehaviorSubject } from 'rxjs'
import {
  map,
  catchError,
  switchMap,
  take,
  takeWhile,
  refCount,
  shareReplay,
} from 'rxjs/operators'
import { Category } from '../models/category.model'
import { Expense } from '../models/expense.model'

@Injectable({ providedIn: 'root' })
export class PouchFacade {
  pouchChanges = this.pouch.change
  constructor(private pouch: SooyahBistroPouchDb) {
    this.pouchChanges.on('change', change => {
      this.subject$.next('')
    })
  }

  subject$ = new BehaviorSubject('')

  order$: Observable<SooyahOrder[]> = from(this.pouch.getOrderPouch()).pipe(
    map(items => {
      return items.rows.map(data => {
        const ret: SooyahOrder = {
          cart: null,
          payment: data.doc.payment,
          delivery: data.doc.delivery,
          price: data.doc.cart
            .map(item => item.price)
            .reduce((pv, cv) => pv + cv, 0),
          menuList: data.doc.cart.map(item => item.name),
          docType: 'order',
          timestamp: new Date(data.doc.timestamp).toLocaleString(),
          location: data.doc.location,
        }
        return ret
      })
    })
  )

  categoriesObsevable$: Observable<string[]> = this.subject$
    .asObservable()
    .pipe(switchMap(change => from(this.pouch.getCategoriesPouch())))
    .pipe(
      map(items => items.rows.map(item => item.doc.name)),
      catchError(() => [])
    )

  inventoryObservable$ = this.subject$.asObservable().pipe(
    switchMap(change => from(this.pouch.getInventoryItemsPouch())),
    map(items =>
      items.rows.map(
        item => ({
          name: item.doc.name,
          stock: item.doc.stock,
          imageUrl: item.doc.imgUrl,
          category: item.doc.category,
          price: item.doc.price,
        }),
        catchError(() => [])
      )
    )
  )

  meuItemObservable$ = this.subject$
    .asObservable()
    .pipe(switchMap(change => from(this.pouch.getMenuItemsPouch())))
    .pipe(
      map(
        items =>
          items.rows.map(item => ({
            category: item.doc.category,
            name: item.doc.name,
            combo: item.doc.combo,
            price: item.doc.price,
            imageUrl: item.doc.imageUrl,
          })),

        catchError(() => [])
      ),
      shareReplay()
    )

  expenses$: Observable<Expense[]> = from(this.pouch.getExpensePouch()).pipe(
    map(items =>
      items.rows.map(expense => ({
        name: expense.doc.name,
        date: new Date(expense.doc.date).toLocaleDateString(),
        type: expense.doc.docType,
        amount: expense.doc.amount,
      }))
    )
  )

  putCategories(items: Category) {
    this.pouch.putCategoryItemPouch(items)
  }

  putInventory(items: InventoryItem) {
    this.pouch.putInventoryItemPouch(items)
  }

  putMenuItem(items: MenuItem) {
    this.pouch.putMenuItemsPouch(items)
  }

  deleteInventoryItem(name: string) {
    const delete$ = this.meuItemObservable$
    delete$
      .pipe(
        map(items =>
          items
            .map(stuff => stuff.combo.reduce((pv, cv) => pv.concat(cv), []))
            .reduce((pv, cv) => pv.concat(cv), [])
            .findIndex(chow => chow === name)
        ),
        take(1)
      )
      .subscribe(found => {
        if (found === -1) {
          this.pouch
            .deleteInventoryItemPouch(name)
            .then(success => console.log(success))
            .catch(err => console.log(err))
        } else {
          alert('A Menu Items has dependency on this')
        }
      })
  }

  deleteCategoryItem(name: string) {
    const delete$ = this.meuItemObservable$
    delete$
      .pipe(
        map(items =>
          items
            .map(stuff => stuff.category)
            .reduce((pv, cv) => pv.concat(cv), [])
            .findIndex(chow => chow === name)
        ),
        take(1)
      )
      .subscribe(found => {
        if (found === -1) {
          this.pouch
            .deleteCategoryPouch(name)
            .then(success => console.log(success))
            .catch(err => console.log(err))
        } else {
          alert('A Menu Items has dependency on this')
        }
      })
  }

  editStock(id: string, newAmount: number) {
    return this.pouch.editStockPouch(id, newAmount)
  }

  deleteMenu(name: string) {
    this.pouch
      .deleteMenuPouch(name)
      .then(sucess => console.log(sucess))
      .catch(err => console.log(err))
  }

  freeOrderMemory(truth: boolean) {
    // this.freeMemory$.next(truth)
  }
}
