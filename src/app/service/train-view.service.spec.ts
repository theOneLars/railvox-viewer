import { TestBed } from '@angular/core/testing';

import { TrainTabService } from './train-tab.service';

describe('TrainViewService', () => {
  let service: TrainTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
