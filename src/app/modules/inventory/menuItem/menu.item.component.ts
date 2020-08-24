import { MatIconRegistry } from '@angular/material/icon'
import { PouchFacade } from 'src/app/facades/facade.pouch'
import { Observable } from 'rxjs'
import { DishdialogComponent } from '../dishdialog/dishdialog.component'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

import { map } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-dish',
  templateUrl: './menu.item.component.html',
  styleUrls: ['./menu.item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  tableColumn = ['name', 'price']
  dataSource: Observable<any[]>

  expandedElement: { name: string; combo: [string]; price: string } | null
  constructor(
    private dialog: MatDialog,
    public pouchFacade: PouchFacade,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.dataSource = this.pouchFacade.meuItemObservable$.pipe(
      map(items =>
        items.map(item => ({
          name: item.name,
          combo: item.combo,
          price: item.price,
        }))
      )
    )
    iconRegistry.addSvgIcon(
      'food',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/foodb.svg')
    )
  }

  ngOnInit() {}

  openDialog(formType: string = 'category') {
    this.dialog.open(DishdialogComponent, {
      data: formType,
    })
  }

  delete(name: string) {
    console.log(name)
    this.pouchFacade.deleteMenu(name)
  }

  trackByFn(item) {
    return item
  }
}
