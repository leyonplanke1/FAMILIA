import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVentasComponent } from './editar-ventas.component';

describe('EditarVentasComponent', () => {
  let component: EditarVentasComponent;
  let fixture: ComponentFixture<EditarVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
