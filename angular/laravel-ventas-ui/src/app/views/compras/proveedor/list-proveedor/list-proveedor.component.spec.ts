import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProveedorComponent } from './list-proveedor.component';

describe('ListProveedorComponent', () => {
  let component: ListProveedorComponent;
  let fixture: ComponentFixture<ListProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
