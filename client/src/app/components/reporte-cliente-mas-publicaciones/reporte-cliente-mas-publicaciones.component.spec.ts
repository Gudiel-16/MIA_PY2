import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClienteMasPublicacionesComponent } from './reporte-cliente-mas-publicaciones.component';

describe('ReporteClienteMasPublicacionesComponent', () => {
  let component: ReporteClienteMasPublicacionesComponent;
  let fixture: ComponentFixture<ReporteClienteMasPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteClienteMasPublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteClienteMasPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
