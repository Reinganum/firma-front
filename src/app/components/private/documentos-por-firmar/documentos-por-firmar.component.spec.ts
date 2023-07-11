import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPorFirmarComponent } from './documentos-por-firmar.component';

describe('DocumentosPorFirmarComponent', () => {
  let component: DocumentosPorFirmarComponent;
  let fixture: ComponentFixture<DocumentosPorFirmarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosPorFirmarComponent]
    });
    fixture = TestBed.createComponent(DocumentosPorFirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
