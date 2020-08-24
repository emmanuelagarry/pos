import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CreatecategoryComponent } from './createcategory.component'

describe('CreatecategoryComponent', () => {
  let component: CreatecategoryComponent
  let fixture: ComponentFixture<CreatecategoryComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecategoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecategoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
