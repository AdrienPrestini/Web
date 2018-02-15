import { TestBed, inject } from '@angular/core/testing';

import { ManagementService } from './management.service';

describe('ManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagementService]
    });
  });

  it('should be created', inject([ManagementService], (service: ManagementService) => {
    expect(service).toBeTruthy();
  }));
});
