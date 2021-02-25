import { ChangeComponent } from './change/change.component'
import { CartFacade } from 'src/app/facades/cart.facade'
import { PaymentmodalComponent } from './paymentmodal/paymentmodal.component'
import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { PromotionComponent } from './promotion/promotion.component'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  payment = [
    'CASH PAYMENT (NGN)',
    'BANK TRANFER (NGN)',
    'NAIRABOX (NGN)',
    'JUMIA PAY (NGN)',
    'CARD PAYMENT (NGN)',
  ]

  paymentTypeAnswer: string

  delivery: string
  constructor(
    private modalController: ModalController,

    private cartFacade: CartFacade,
    private dialog: MatDialog,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) {}
  ngOnInit() {}

  async openPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentmodalComponent,
    })
    return modal.present()
  }

  promo() {
    this.dialog.open(PromotionComponent, {})
  }

  tender() {
    if (this.paymentTypeAnswer === this.payment[0]) {
      this.bottomSheet.open(ChangeComponent, {
        disableClose: true,
        data: {
          paymentType: this.paymentTypeAnswer,
          delivery: this.delivery,
        },
      })

      // this.router.navigate(['/tab/receipt'])
    } else {
      this.router.navigate(['/tab/receipt'])

      this.cartFacade.checkout(this.paymentTypeAnswer, this.delivery)
    }
  }
}
