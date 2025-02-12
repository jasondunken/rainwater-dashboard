import { TestBed } from '@angular/core/testing';

import { SondeService } from './sonde.service';

describe('SondeService', () => {
  let service: SondeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SondeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
