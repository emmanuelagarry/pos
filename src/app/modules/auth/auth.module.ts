import { SetlocationComponent } from './setlocation/setlocation.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import {
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatDialogModule,
} from '@angular/material'

import { IonicModule } from '@ionic/angular'

import { AuthPage } from './auth.page'

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthPage, SetlocationComponent],
  entryComponents: [SetlocationComponent],
})
export class AuthPageModule {}
