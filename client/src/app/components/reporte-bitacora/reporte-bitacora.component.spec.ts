import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteBitacoraComponent } from './reporte-bitacora.component';

describe('ReporteBitacoraComponent', () => {
  let component: ReporteBitacoraComponent;
  let fixture: ComponentFixture<ReporteBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteBitacoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
