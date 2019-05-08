import { TestBed } from '@angular/core/testing';

import { BacklogItemService } from './backlog-item-service';

describe('BacklogItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BacklogItemService = TestBed.get(BacklogItemService);
    expect(service).toBeTruthy();
  });
});
