import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFirmaDocumentoComponent } from './formulario-firma-documento.component';

describe('FormularioFirmaDocumentoComponent', () => {
  let component: FormularioFirmaDocumentoComponent;
  let fixture: ComponentFixture<FormularioFirmaDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioFirmaDocumentoComponent]
    });
    fixture = TestBed.createComponent(FormularioFirmaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
