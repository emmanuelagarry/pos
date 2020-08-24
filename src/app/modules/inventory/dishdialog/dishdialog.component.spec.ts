import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishdialogComponent } from './dishdialog.component';

describe('DishdialogComponent', () => {
  let component: DishdialogComponent;
  let fixture: ComponentFixture<DishdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishdialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
