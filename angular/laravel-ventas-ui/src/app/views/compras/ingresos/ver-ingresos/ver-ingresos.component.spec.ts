import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIngresosComponent } from './ver-ingresos.component';

describe('VerIngresosComponent', () => {
  let component: VerIngresosComponent;
  let fixture: ComponentFixture<VerIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
