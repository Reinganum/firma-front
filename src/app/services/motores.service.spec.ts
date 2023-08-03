import { TestBed } from '@angular/core/testing';

import { MotoresService } from './motores.service';

describe('MotoresService', () => {
  let service: MotoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
