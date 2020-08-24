import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReceiptComponent } from './receipt.component'

describe('ReceiptComponent', () => {
  let component: ReceiptComponent
  let fixture: ComponentFixture<ReceiptComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
