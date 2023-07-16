import { TestBed } from '@angular/core/testing';

import { PrivateUserGuard } from './private-user.guard';

describe('PrivateUserGuard', () => {
  let guard: PrivateUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivateUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
