import { TestBed } from '@angular/core/testing';

import { OutsGuard } from './outs.guard';

describe('OutsGuard', () => {
  let guard: OutsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OutsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
