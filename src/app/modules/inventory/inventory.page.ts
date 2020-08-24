import { ObservableService } from './../../services/ObservableService.service'
import { MatDialog } from '@angular/material'
import { map, tap, take } from 'rxjs/operators'
import { AuthService } from './../../services/auth/auth.service'
import { Component, OnInit } from '@angular/core'
import { DelaydialogComponent } from './delaydialog/delaydialog.component'
import { iif, of } from 'rxjs'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  disable$ = this.auth.credential$.pipe(
    map(credential => {
      if (credential) {
        return credential.credential === 'superuser' ||
          credential.credential === 'admin'
          ? true
          : false
      }
    })
  )
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private obsServive: ObservableService
  ) {}

  ngOnInit() {
    this.obsServive.delayDialogSubject$
      .pipe(
        tap(state => {
          if (state === true) {
            this.dialog.open(DelaydialogComponent)
          }
        })
      )
      .subscribe()
  }
}
