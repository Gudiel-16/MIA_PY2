import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosMiProductoComponent } from './comentarios-mi-producto.component';

describe('ComentariosMiProductoComponent', () => {
  let component: ComentariosMiProductoComponent;
  let fixture: ComponentFixture<ComentariosMiProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosMiProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosMiProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
