import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { PouchFacade } from 'src/app/facades/facade.pouch'
import { DishdialogComponent } from '../dishdialog/dishdialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category$: Observable<string[]>

  constructor(private pouchFacade: PouchFacade, private dialog: MatDialog) {
    this.category$ = this.pouchFacade.categoriesObsevable$
  }

  ngOnInit() {}

  openDialog() {
    this.dialog.open(DishdialogComponent, {
      data: 'category',
    })
  }
  createCategory() {}

  delete(name) {
    this.pouchFacade.deleteCategoryItem(name)
  }
}
