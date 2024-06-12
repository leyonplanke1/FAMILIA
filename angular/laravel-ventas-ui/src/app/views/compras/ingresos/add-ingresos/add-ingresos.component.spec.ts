import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngresosComponent } from './add-ingresos.component';

describe('AddIngresosComponent', () => {
  let component: AddIngresosComponent;
  let fixture: ComponentFixture<AddIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
