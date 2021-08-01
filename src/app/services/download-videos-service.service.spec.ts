import { TestBed } from '@angular/core/testing';

import { DownloadVideosServiceService } from './download-videos-service.service';

describe('DownloadVideosServiceService', () => {
  let service: DownloadVideosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadVideosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
