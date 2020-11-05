import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePaisesCreditoProductoComponent } from './reporte-paises-credito-producto.component';

describe('ReportePaisesCreditoProductoComponent', () => {
  let component: ReportePaisesCreditoProductoComponent;
  let fixture: ComponentFixture<ReportePaisesCreditoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePaisesCreditoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePaisesCreditoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
