import { ObservableService } from './../../../services/ObservableService.service'
import { MenuItem } from './../../../models/menu.item.model'
import { PouchFacade } from './../../../facades/facade.pouch'
import { Dish } from './../../../models/dish.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category } from 'src/app/models/category.model'

@Component({
  selector: 'app-dishdialog',
  templateUrl: './dishdialog.component.html',
  styleUrls: ['./dishdialog.component.scss'],
})
export class DishdialogComponent implements OnInit {
  nameForm: FormGroup
  foodForm: FormGroup
  categoryForm: FormGroup
  fileForm: FormGroup
  category$: Observable<string[]>
  url: string

  @Output() animationEnd = new EventEmitter()

  chow$: Observable<any[]>
  chiplist = []
  constructor(
    private pouchFacade: PouchFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public formType: 'food' | 'category',
    private dialogRef: MatDialogRef<DishdialogComponent>,
    private observableService: ObservableService
  ) {
    this.chow$ = this.pouchFacade.inventoryObservable$.pipe(
      map(items => items.map(chow => chow.name))
    )
    this.nameForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, Validators.required],
    })
    this.foodForm = this.fb.group({
      select: [null, Validators.required],
    })

    this.categoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
    })

    this.category$ = this.pouchFacade.categoriesObsevable$

    this.fileForm = this.fb.group({
      file: [null, Validators.required],
    })
  }

  ngOnInit() {}

  addFood({ select }) {
    this.chiplist.push(select)
  }

  removeFood(index) {
    this.chiplist.splice(index, 1)
  }

  addToCategory(formData: Category) {
    formData.docType = 'category'
    formData.name = formData.name.toLowerCase().trim()
    this.pouchFacade.putCategories(formData)
    this.categoryForm.reset()
  }

  finish() {
    this.nameForm.value.name = this.nameForm.value.name.toUpperCase().trim()

    const meal: MenuItem = {
      ...this.nameForm.value,
      combo: this.chiplist,
      imageUrl: this.url,
    }

    this.pouchFacade.putMenuItem(meal)
    this.dialogRef.close()
    this.observableService.delayDialogSubject$.next(true)
  }

  fileUrl(event) {
    this.url = event
  }
}
