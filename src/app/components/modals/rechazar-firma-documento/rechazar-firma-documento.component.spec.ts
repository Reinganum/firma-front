import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarFirmaDocumentoComponent } from './rechazar-firma-documento.component';

describe('RechazarFirmaDocumentoComponent', () => {
  let component: RechazarFirmaDocumentoComponent;
  let fixture: ComponentFixture<RechazarFirmaDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechazarFirmaDocumentoComponent]
    });
    fixture = TestBed.createComponent(RechazarFirmaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
