import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosFirmaComponent } from './datos-firma.component';

describe('DatosFirmaComponent', () => {
  let component: DatosFirmaComponent;
  let fixture: ComponentFixture<DatosFirmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosFirmaComponent]
    });
    fixture = TestBed.createComponent(DatosFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
