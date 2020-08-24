import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paymentmodal',
  templateUrl: './paymentmodal.component.html',
  styleUrls: ['./paymentmodal.component.scss'],
})
export class PaymentmodalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss();
  }

}
