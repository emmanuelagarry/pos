import { CartComponent } from './../home/modal/cart.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { PosPage } from './pos.page'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatRippleModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
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
