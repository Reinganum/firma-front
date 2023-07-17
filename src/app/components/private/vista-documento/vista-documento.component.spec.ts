import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDocumentoComponent } from './vista-documento.component';

describe('VistaDocumentoComponent', () => {
  let component: VistaDocumentoComponent;
  let fixture: ComponentFixture<VistaDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaDocumentoComponent]
    });
    fixture = TestBed.createComponent(VistaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
