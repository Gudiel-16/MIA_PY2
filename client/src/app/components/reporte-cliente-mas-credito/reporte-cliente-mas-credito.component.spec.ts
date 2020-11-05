import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClienteMasCreditoComponent } from './reporte-cliente-mas-credito.component';

describe('ReporteClienteMasCreditoComponent', () => {
  let component: ReporteClienteMasCreditoComponent;
  let fixture: ComponentFixture<ReporteClienteMasCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteClienteMasCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteClienteMasCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
