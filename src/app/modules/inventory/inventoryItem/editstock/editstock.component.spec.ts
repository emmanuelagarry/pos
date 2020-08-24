import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EditstockComponent } from './editstock.component'

describe('EditstockComponent', () => {
  let component: EditstockComponent
  let fixture: ComponentFixture<EditstockComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditstockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstockComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
