import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngresosComponent } from './edit-ingresos.component';

describe('EditIngresosComponent', () => {
  let component: EditIngresosComponent;
  let fixture: ComponentFixture<EditIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
