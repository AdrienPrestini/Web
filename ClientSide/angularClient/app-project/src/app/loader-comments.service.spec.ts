import { TestBed, inject } from '@angular/core/testing';

import { LoaderCommentsService } from './loader-comments.service';

describe('LoaderCommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderCommentsService]
    });
  });

  it('should be created', inject([LoaderCommentsService], (service: LoaderCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
