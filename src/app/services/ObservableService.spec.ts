import { TestBed } from '@angular/core/testing'

import { ObservableService } from './ObservableService.service'

describe('ObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ObservableService = TestBed.inject(ObservableService)
    expect(service).toBeTruthy()
  })
})
