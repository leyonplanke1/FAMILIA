import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfVentasComponent } from './pdf-ventas.component';

describe('PdfVentasComponent', () => {
  let component: PdfVentasComponent;
  let fixture: ComponentFixture<PdfVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
