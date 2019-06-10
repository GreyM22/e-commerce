import { TestBed, async, inject } from '@angular/core/testing';

import { RegisterUserCanDeactivateGuard } from './register-user-can-deactivate.guard';

describe('RegisterUserCanDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterUserCanDeactivateGuard]
    });
  });

  it('should ...', inject([RegisterUserCanDeactivateGuard], (guard: RegisterUserCanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
