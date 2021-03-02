import { TestBed } from '@angular/core/testing'

import { NgfirestoreService } from './ngfirestore.service'

describe('NgfirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: NgfirestoreService = TestBed.inject(NgfirestoreService)
    expect(service).toBeTruthy()
  })
})
