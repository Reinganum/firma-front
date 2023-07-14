import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerRutComponent } from './obtener-rut.component';

describe('ObtenerRutComponent', () => {
  let component: ObtenerRutComponent;
  let fixture: ComponentFixture<ObtenerRutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObtenerRutComponent]
    });
    fixture = TestBed.createComponent(ObtenerRutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
