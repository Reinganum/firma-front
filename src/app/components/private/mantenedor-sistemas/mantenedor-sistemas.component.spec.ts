import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorSistemasComponent } from './mantenedor-sistemas.component';

describe('MantenedorSistemasComponent', () => {
  let component: MantenedorSistemasComponent;
  let fixture: ComponentFixture<MantenedorSistemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenedorSistemasComponent]
    });
    fixture = TestBed.createComponent(MantenedorSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
