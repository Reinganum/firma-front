import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrigenesComponent } from './tabla-origenes.component';

describe('TablaOrigenesComponent', () => {
  let component: TablaOrigenesComponent;
  let fixture: ComponentFixture<TablaOrigenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaOrigenesComponent]
    });
    fixture = TestBed.createComponent(TablaOrigenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
