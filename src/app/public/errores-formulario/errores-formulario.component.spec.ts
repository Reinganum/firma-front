import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresFormularioComponent } from './errores-formulario.component';

describe('ErroresFormularioComponent', () => {
  let component: ErroresFormularioComponent;
  let fixture: ComponentFixture<ErroresFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErroresFormularioComponent]
    });
    fixture = TestBed.createComponent(ErroresFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
