import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaConfirmadaComponent } from './cuenta-confirmada.component';

describe('CuentaConfirmadaComponent', () => {
  let component: CuentaConfirmadaComponent;
  let fixture: ComponentFixture<CuentaConfirmadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaConfirmadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaConfirmadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
