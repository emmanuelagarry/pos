import { AuthPage } from './../auth.page'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { SooyahBistroPouchDb } from 'src/app/pouchdb/pouchdb.sooyah-bistro'
import { MatDialogRef } from '@angular/material'
function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0
  const isValid = !isWhitespace
  return isValid ? null : { whitespace: true }
}

@Component({
  selector: 'app-setlocation',
  templateUrl: './setlocation.component.html',
  styleUrls: ['./setlocation.component.scss'],
})
export class SetlocationComponent implements OnInit {
  locationForm: FormGroup
  constructor(
    fb: FormBuilder,
    private pouch: SooyahBistroPouchDb,
    public dialogRef: MatDialogRef<AuthPage>
  ) {
    this.locationForm = fb.group({
      location: ['', Validators.compose([Validators.required])],
    })
  }
  ngOnInit() {}

  setLocal(formdata) {
    // console.log(formdata)

    this.pouch.setLocation(formdata.location)
    this.dialogRef.close()
  }
}
