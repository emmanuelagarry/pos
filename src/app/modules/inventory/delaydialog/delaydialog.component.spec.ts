import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing'

import { DelaydialogComponent } from './delaydialog.component'

describe('DelaydialogComponent', () => {
  let component: DelaydialogComponent
  let fixture: ComponentFixture<DelaydialogComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DelaydialogComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(DelaydialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
