import { TestBed } from '@angular/core/testing';

import { FirmantesService } from './firmantes.service';

describe('FirmantesService', () => {
  let service: FirmantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
