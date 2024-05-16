import { TestBed } from '@angular/core/testing';
import { BiImplementationService } from '../../src/app/services/bi-implementation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavigationBarService', () => {
  let service: BiImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' })
          }
        }
      ]
    });
    service = TestBed.inject(BiImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
