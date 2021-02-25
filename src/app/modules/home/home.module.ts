import { ProfileGuard } from './../../guards/profile.guard'
import { AuthService } from './../../services/auth/auth.service'
import { CartFacade } from 'src/app/facades/cart.facade'
import { ErrorFacade } from './../../facades/error.facade'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule, Routes } from '@angular/router'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { HomePage } from './home.page'
import { environment } from 'src/environments/environment'
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { UploadFacade } from 'src/app/facades/upload.facade'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { SignupGuard } from 'src/app/guards/signup.guard'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { NgfirestoreService } from 'src/app/services/firestore/ngfirestore.service'

const routes: Routes = [
  {
    path: 'tab',
    component: HomePage,
    children: [
      {
        path: 'pos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pos/pos.module').then(m => m.PosPageModule),
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('../profile/profile.module').then(
                m => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: 'payment',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../payment/payment.module').then(
                m => m.PaymentPageModule
              ),
          },
        ],
      },

      {
        path: 'receipt',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../receipt/receipt.module').then(
                m => m.ReceiptPageModule
              ),
          },
        ],
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inventory/inventory.module').then(
                m => m.InventoryPageModule
              ),
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../report/report.module').then(m => m.ReportPageModule),
          },
        ],
        canActivate: [AuthGuard],
      },

      {
        path: '',
        redirectTo: '/pos',
        pathMatch: 'full',
      },
      {
        path: 'signup',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../auth/auth.module').then(m => m.AuthPageModule),
          },
        ],
        canActivate: [SignupGuard],
      },

      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(
                m => m.ProfilePageModule
              ),
          },
        ],
        canActivate: [ProfileGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tab/pos',
    pathMatch: 'full',
  },
]
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatProgressBarModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    ErrorFacade,
    UploadFacade,
    CartFacade,
    AuthGuard,
    AuthService,
    SignupGuard,
    ProfileGuard,
    NgfirestoreService,
  ],
  entryComponents: [],
})
export class HomePageModule {}
