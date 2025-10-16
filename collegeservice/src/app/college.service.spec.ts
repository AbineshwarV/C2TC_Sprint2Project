import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CollegeService } from './college.service';

describe('CollegeService', () => {
  let service: CollegeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollegeService],
    });
    service = TestBed.inject(CollegeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all colleges', () => {
    const mockColleges = [{ id: 1, name: 'Test College' }];
    service.getAllColleges().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(mockColleges);
    });

    const req = httpMock.expectOne('http://localhost:8080/collegeservice');
    expect(req.request.method).toBe('GET');
    req.flush(mockColleges);
  });
});
