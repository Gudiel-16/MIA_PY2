import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductosMasMegustaComponent } from './reporte-productos-mas-megusta.component';

describe('ReporteProductosMasMegustaComponent', () => {
  let component: ReporteProductosMasMegustaComponent;
  let fixture: ComponentFixture<ReporteProductosMasMegustaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteProductosMasMegustaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductosMasMegustaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
