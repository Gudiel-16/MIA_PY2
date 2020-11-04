import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaClienteComponent } from './bienvenida-cliente.component';

describe('BienvenidaClienteComponent', () => {
  let component: BienvenidaClienteComponent;
  let fixture: ComponentFixture<BienvenidaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
