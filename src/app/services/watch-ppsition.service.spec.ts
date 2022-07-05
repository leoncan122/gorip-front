import { TestBed } from '@angular/core/testing';

import { WatchPpsitionService } from './watch-ppsition.service';

describe('WatchPpsitionService', () => {
  let service: WatchPpsitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchPpsitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
