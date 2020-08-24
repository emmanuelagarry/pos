import { PouchFacade } from 'src/app/facades/facade.pouch'
import { InventoryItem } from './../../../models/inventory.item.model'

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { ObservableService } from 'src/app/services/ObservableService.service'

@Component({
  selector: 'app-createdialog',
  templateUrl: './createdialog.component.html',
  styleUrls: ['./createdialog.component.scss'],
})
export class CreatedialogComponent implements OnInit {
  productForm: FormGroup
  categoryForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatedialogComponent>,
    private pouchFacade: PouchFacade,
    private observableService: ObservableService
  ) {
    this.productForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      stock: [null, Validators.compose([Validators.required])],
    })

    // this.categoryForm = this.fb.group({
    //   category: [null, Validators.compose([Validators.required])],
    // });
  }
  imageUrl: string
  ngOnInit() {}

  addToProduct(formData: InventoryItem) {
    formData.imgUrl = this.imageUrl
    formData.name = formData.name.toLowerCase().trim()
    this.pouchFacade.putInventory(formData)
    this.dialogRef.close()
    this.observableService.delayDialogSubject$.next(true)
  }

  fileUrl(event) {
    this.imageUrl = event
  }
}
