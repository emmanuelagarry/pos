import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PromotionComponent } from './promotion.component'

describe('PromotionComponent', () => {
  let component: PromotionComponent
  let fixture: ComponentFixture<PromotionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
