import { MatSnackBar } from '@angular/material'
import { ObservableService } from '../../services/ObservableService.service'
import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterEvent,
  Router,
} from '@angular/router'

import { of } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tab$ = this.tab.tab$
  loading = true

  notification = of(true)
  constructor(
    private menu: MenuController,
    private tab: ObservableService,
    router: Router,
    private snackBar: MatSnackBar
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.checkRouterEvent(event)
    })

    // this.notification.subscribe(show => {
    //   this.snackBar.open('i deh hers', '', {
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //   })
    // })
  }

  ngOnInit() {
    this.menu.enable(true, 'first')
  }

  checkRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loading = false
    }
  }

  toogleMenu() {
    this.menu.toggle('first')
  }
}
