import { TestBed } from '@angular/core/testing';

import { ComunesService } from './comunes.service';

describe('ComunesService', () => {
  let service: ComunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
