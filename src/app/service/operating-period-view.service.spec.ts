import { TestBed } from '@angular/core/testing';

import { OperatingPeriodViewService } from './operating-period-view.service';

describe('OperatingPeriodViewService', () => {
  let service: OperatingPeriodViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatingPeriodViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
