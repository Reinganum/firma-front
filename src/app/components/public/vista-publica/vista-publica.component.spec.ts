import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPublicaComponent } from './vista-publica.component';

describe('VistaDocumentoComponent', () => {
  let component: VistaPublicaComponent;
  let fixture: ComponentFixture<VistaPublicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaPublicaComponent]
    });
    fixture = TestBed.createComponent(VistaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
