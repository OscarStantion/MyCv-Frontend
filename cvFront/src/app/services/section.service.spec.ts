import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SectionService } from './section.service';
import { API_BASE } from '../config/api.config';

describe('SectionService', () => {
  let service: SectionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SectionService]
    });

    service = TestBed.inject(SectionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch sections by cv id', () => {
    const mock = [{ id: 1, nombre: 'Experiencia', orden: 1, cvId: 1 }];

    service.getSectionsByCv(1).subscribe((res) => {
      expect(res).toEqual(mock);
    });

    const req = httpMock.expectOne(`${API_BASE}/cv/cv/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
