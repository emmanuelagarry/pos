import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing'

import { DropzoneComponent } from './dropzone.component'

describe('DropzoneComponent', () => {
  let component: DropzoneComponent
  let fixture: ComponentFixture<DropzoneComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropzoneComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
