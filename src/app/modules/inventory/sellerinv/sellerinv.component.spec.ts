import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SellerinvComponent } from './sellerinv.component'

describe('SellerinvComponent', () => {
  let component: SellerinvComponent
  let fixture: ComponentFixture<SellerinvComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellerinvComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerinvComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
