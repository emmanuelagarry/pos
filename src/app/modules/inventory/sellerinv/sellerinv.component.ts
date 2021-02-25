import { ModalController } from '@ionic/angular'
import { StackComponent } from './stack/stack.component'
import { Observable } from 'rxjs'
import { PouchFacade } from 'src/app/facades/facade.pouch'
import { Component, OnInit } from '@angular/core'

import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-sellerinv',
  templateUrl: './sellerinv.component.html',
  styleUrls: ['./sellerinv.component.scss'],
})
export class SellerinvComponent implements OnInit {
  private inv = []
  inventory$: Observable<{ name: string; stock: number; imageUrl: string }[]>

  constructor(
    private pouchFacade: PouchFacade,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,

    public modalCtr: ModalController
  ) {
    this.inventory$ = this.pouchFacade.inventoryObservable$
    iconRegistry.addSvgIcon(
      'tray',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/tray.svg')
    )
  }

  ngOnInit() {}

  add(item) {
    this.inv.push(item.name)
  }

  async checkStack() {
    const myDialog = await this.modalCtr.create({
      component: StackComponent,
      componentProps: {
        data: this.inv,
      },
    })

    myDialog.present()
    const { data } = await myDialog.onWillDismiss()
    if (data) {
      this.inv = []
    }
  }
}
