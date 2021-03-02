import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { CreatecategoryComponent } from './createcategory.component'

describe('CreatecategoryComponent', () => {
  let component: CreatecategoryComponent
  let fixture: ComponentFixture<CreatecategoryComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CreatecategoryComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecategoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
