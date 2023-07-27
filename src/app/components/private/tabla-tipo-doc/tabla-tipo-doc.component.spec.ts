import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoDocComponent } from './tabla-tipo-doc.component';

describe('TablaTipoDocComponent', () => {
  let component: TablaTipoDocComponent;
  let fixture: ComponentFixture<TablaTipoDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaTipoDocComponent]
    });
    fixture = TestBed.createComponent(TablaTipoDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
