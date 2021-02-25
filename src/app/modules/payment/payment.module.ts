import { ReceiptComponent } from './receipt/receipt.component'
import { PaymentmodalComponent } from './paymentmodal/paymentmodal.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatRadioModule } from '@angular/material/radio'
import { MatToolbarModule } from '@angular/material/toolbar'

import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { PaymentPage } from './payment.page'
import { ChangeComponent } from './change/change.component'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { PromotionComponent } from './promotion/promotion.component'

const routes: Routes = [
  {
    path: '',
    component: PaymentPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    MatRadioModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,

    CdkTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PaymentPage,
    PaymentmodalComponent,
    ReceiptComponent,
    ChangeComponent,
    PromotionComponent,
  ],
  providers: [],
  entryComponents: [
    PaymentmodalComponent,
    ReceiptComponent,
    ChangeComponent,
    PromotionComponent,
  ],
})
export class PaymentPageModule {}
