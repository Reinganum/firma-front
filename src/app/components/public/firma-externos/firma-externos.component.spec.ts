import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaExternosComponent } from './firma-externos.component';

describe('VistaDocumentoComponent', () => {
  let component: FirmaExternosComponent;
  let fixture: ComponentFixture<FirmaExternosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmaExternosComponent]
    });
    fixture = TestBed.createComponent(FirmaExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
