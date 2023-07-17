import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionFirmaDocumentoComponent } from './confirmacion-firma-documento.component';

describe('ConfirmacionFirmaDocumentoComponent', () => {
  let component: ConfirmacionFirmaDocumentoComponent;
  let fixture: ComponentFixture<ConfirmacionFirmaDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionFirmaDocumentoComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionFirmaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
