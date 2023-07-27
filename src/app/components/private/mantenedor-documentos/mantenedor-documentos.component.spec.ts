import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorDocumentosComponent } from './mantenedor-documentos.component';

describe('MantenedorDocumentosComponent', () => {
  let component: MantenedorDocumentosComponent;
  let fixture: ComponentFixture<MantenedorDocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenedorDocumentosComponent]
    });
    fixture = TestBed.createComponent(MantenedorDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
