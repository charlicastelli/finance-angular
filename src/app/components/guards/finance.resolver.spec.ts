import { TestBed } from '@angular/core/testing';

import { FinanceResolver } from './finance.resolver';

describe('FinanceResolver', () => {
  let resolver: FinanceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FinanceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
