import { CartFacade } from 'src/app/facades/cart.facade'
import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$ = this.cartFacade.carList$
  price = this.cartFacade.total$

  constructor(
    private cartFacade: CartFacade,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.cart$ = this.cartFacade.carList$
  }

  deleteFromCart(obs: string) {
    this.cartFacade.removeFromCart(obs)
  }

  deleteAllfromCart() {
    this.cartFacade.removeAllFromCart()
  }

  dismiss() {
    this.modalController.dismiss()
  }
}
