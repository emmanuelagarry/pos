import { CartComponent } from './../home/modal/cart.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { PosPage } from './pos.page'
import {
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRippleModule,
} from '@angular/material'
import { ScrollingModule } from '@angular/cdk/scrolling'

const routes: Routes = [
  {
    path: '',
    component: PosPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRippleModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PosPage, CartComponent],
  entryComponents: [CartComponent],
})
export class PosPageModule {}
