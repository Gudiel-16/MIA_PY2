import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductosMasVendidosComponent } from './reporte-productos-mas-vendidos.component';

describe('ReporteProductosMasVendidosComponent', () => {
  let component: ReporteProductosMasVendidosComponent;
  let fixture: ComponentFixture<ReporteProductosMasVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteProductosMasVendidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductosMasVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
