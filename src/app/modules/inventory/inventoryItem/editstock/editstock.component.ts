import { InventoryItemComponent } from './../inventory.item.component'
import { PouchFacade } from 'src/app/facades/facade.pouch'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.scss'],
})
export class EditstockComponent implements OnInit {
  stockForm: FormGroup
  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facadePouch: PouchFacade,
    private dialogRef: MatDialogRef<InventoryItemComponent>
  ) {
    this.stockForm = fb.group({
      number: [null, Validators.required],
    })
  }

  submit(formdata) {
    this.facadePouch.editStock(this.data, formdata.number)
    this.dialogRef.close()
  }
  ngOnInit() {
    console.log(this.data)
  }
}
