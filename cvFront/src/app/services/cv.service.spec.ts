import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CvService } from './cv.service';
import type { CvResponse } from '../models/cv.model';
import { API_BASE } from '../config/api.config';

describe('CvService', () => {
  let service: CvService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CvService]
    });

    service = TestBed.inject(CvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch CV summaries', () => {
    const mock: CvResponse = { id: 1, nombre: 'Juan', profesion: 'DEV' };

    service.getCvSummary().subscribe((res) => {
      expect(res).toEqual(mock);
    });

    const req = httpMock.expectOne(`${API_BASE}/cv`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
