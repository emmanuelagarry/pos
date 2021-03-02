import { EditstockComponent } from './editstock/editstock.component'
import { Observable } from 'rxjs'
import { CreatedialogComponent } from '../createdialog/createdialog.component'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { map } from 'rxjs/operators'
import { PouchFacade } from 'src/app/facades/facade.pouch'

@Component({
  selector: 'app-food',
  templateUrl: './inventory.item.component.html',
  styleUrls: ['./inventory.item.component.scss'],
})
export class InventoryItemComponent implements OnInit {
  tableColumn = ['name', 'stock', 'price', 'category']
  dataSource: Observable<any[]>
  constructor(private dialog: MatDialog, private pouchFacade: PouchFacade) {
    this.dataSource = this.pouchFacade.inventoryObservable$
  }

  ngOnInit() {}

  openDialog() {
    this.dialog.open(CreatedialogComponent)
  }

  editStock(name) {
    this.dialog.open(EditstockComponent, {
      data: name,
    })
  }

  delete(name: string) {
    this.pouchFacade.deleteInventoryItem(name)
  }

  trackByFn(item) {
    return item.id
  }
}
