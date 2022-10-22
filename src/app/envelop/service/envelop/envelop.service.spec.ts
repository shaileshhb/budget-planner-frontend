import { TestBed } from '@angular/core/testing';

import { EnvelopService } from './envelop.service';

describe('EnvelopService', () => {
  let service: EnvelopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvelopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
