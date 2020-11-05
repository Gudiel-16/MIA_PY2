import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductosMasNomegustaComponent } from './reporte-productos-mas-nomegusta.component';

describe('ReporteProductosMasNomegustaComponent', () => {
  let component: ReporteProductosMasNomegustaComponent;
  let fixture: ComponentFixture<ReporteProductosMasNomegustaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteProductosMasNomegustaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductosMasNomegustaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
