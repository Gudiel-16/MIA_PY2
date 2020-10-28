import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosBloqueadosComponent } from './productos-bloqueados.component';

describe('ProductosBloqueadosComponent', () => {
  let component: ProductosBloqueadosComponent;
  let fixture: ComponentFixture<ProductosBloqueadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosBloqueadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosBloqueadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
