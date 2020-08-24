import { PouchFacade } from 'src/app/facades/facade.pouch'
import { CartComponent } from '../home/modal/cart.component'
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular'

import { Dish } from 'src/app/models/dish.model'
import { CartFacade } from 'src/app/facades/cart.facade'
import {
  map,
  distinctUntilChanged,
  debounceTime,
  catchError,
} from 'rxjs/operators'

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosPage implements OnInit {
  allProducts$: Observable<any>
  priceTotal$: Observable<number>
  check$: Observable<Dish[]>
  mealType: string
  menu$

  constructor(
    private pouchFacade: PouchFacade,
    private alertController: AlertController,
    private carftFacade: CartFacade,
    public modalController: ModalController,
    public toastController: ToastController
  ) {
    this.menu$ = this.pouchFacade.meuItemObservable$.pipe(
      map(items =>
        items.map(item => ({
          name: item.name,
          combo: item.combo,
          price: item.price,
          imageUrl: item.imageUrl,
        }))
      )
    )
  }

  searchSortSubject$ = new BehaviorSubject<string>('')
  private searchSort$ = this.searchSortSubject$.asObservable().pipe(
    debounceTime(500),
    distinctUntilChanged()
  )
  private unsorted$ = this.pouchFacade.meuItemObservable$.pipe(
    map(items =>
      items.map(item => ({
        name: item.name,
        combo: item.combo,
        price: item.price,
        imageUrl: item.imageUrl,
      }))
    )
  )
  sorted$ = combineLatest([this.searchSort$, this.unsorted$]).pipe(
    map(([searchString, menu]) => {
      if (searchString.trim()) {
        const chow = menu.filter(items =>
          items.name
            .toLowerCase()
            .trim()
            .includes(searchString.toLowerCase())
        )
        return chow
      }
      return menu
    })
  )

  ngOnInit() {}

  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartComponent,
    })
    modal.present()
  }

  deleteItem(id) {
    this.carftFacade.removeFromCart(id)
  }

  changeMenu(id: string) {
    this.mealType = id
  }

  addToArray(item) {
    const uniqueId = new Date().getTime()
    this.carftFacade.addtoCart({ ...item, observableId: uniqueId })
    this.presentToast()
  }
  async deleAll() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete all items</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.carftFacade.removeAllFromCart()
          },
        },
      ],
    })

    await alert.present()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item added to cart',
      duration: 500,
    })
    toast.present()
  }

  trackByFn(item) {
    return item.id
  }
}
