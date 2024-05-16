import { TestBed } from '@angular/core/testing';
import { TabVisibilityService } from '../../src/app/services/tab-visibility.service';

describe('NavigationBarService', () => {
  let service: TabVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
