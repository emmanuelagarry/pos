import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InventoryItemComponent } from './inventory.item.component'

describe('FoodComponent', () => {
  let component: InventoryItemComponent
  let fixture: ComponentFixture<InventoryItemComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
