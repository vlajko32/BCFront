import { TestBed } from '@angular/core/testing';

import { CoachGuardGuard } from './coach-guard.guard';

describe('CoachGuardGuard', () => {
  let guard: CoachGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoachGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
