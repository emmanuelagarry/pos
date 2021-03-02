import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ReceiptPage } from './receipt.page'
import { CdkTableModule } from '@angular/cdk/table'
import { HammertimeDirective } from '../directives/hammertime.directive'

const routes: Routes = [
  {
    path: '',
    component: ReceiptPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    CdkTableModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ReceiptPage, HammertimeDirective],
})
export class ReceiptPageModule {}
