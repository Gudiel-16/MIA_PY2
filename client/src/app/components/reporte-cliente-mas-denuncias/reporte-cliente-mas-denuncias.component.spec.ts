import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClienteMasDenunciasComponent } from './reporte-cliente-mas-denuncias.component';

describe('ReporteClienteMasDenunciasComponent', () => {
  let component: ReporteClienteMasDenunciasComponent;
  let fixture: ComponentFixture<ReporteClienteMasDenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteClienteMasDenunciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteClienteMasDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
