import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMiProductoComponent } from './chat-mi-producto.component';

describe('ChatMiProductoComponent', () => {
  let component: ChatMiProductoComponent;
  let fixture: ComponentFixture<ChatMiProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMiProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMiProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
