import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
} from '@angular/material'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ReportPage } from './report.page'
import { SharedModule } from '../shared/shared.module'

const routes: Routes = [
  {
    path: '',
    component: ReportPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ReportPage],
})
export class ReportPageModule {}
