import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDocumentoComponent } from './consultar-documento.component';

describe('ConsultarDocumentoComponent', () => {
  let component: ConsultarDocumentoComponent;
  let fixture: ComponentFixture<ConsultarDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarDocumentoComponent]
    });
    fixture = TestBed.createComponent(ConsultarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
