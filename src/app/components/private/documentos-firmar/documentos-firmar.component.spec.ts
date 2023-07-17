import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosFirmarComponent } from './documentos-firmar.component';

describe('DocumentosFirmarComponent', () => {
  let component: DocumentosFirmarComponent;
  let fixture: ComponentFixture<DocumentosFirmarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosFirmarComponent]
    });
    fixture = TestBed.createComponent(DocumentosFirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
