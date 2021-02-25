import { InventoryPage } from './../inventory.page'
import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-delaydialog',
  templateUrl: './delaydialog.component.html',
  styleUrls: ['./delaydialog.component.scss'],
})
export class DelaydialogComponent implements OnInit {
  diameter = 25
  strokeWidth = 2
  constructor(public dialogRef: MatDialogRef<InventoryPage>) {}

  ngOnInit() {
    // sets a time out and closes the dialog
    setTimeout(() => {
      this.dialogRef.close()
    }, 4000)
  }
}
