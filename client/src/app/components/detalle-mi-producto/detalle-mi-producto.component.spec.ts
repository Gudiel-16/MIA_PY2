import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMiProductoComponent } from './detalle-mi-producto.component';

describe('DetalleMiProductoComponent', () => {
  let component: DetalleMiProductoComponent;
  let fixture: ComponentFixture<DetalleMiProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMiProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMiProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
