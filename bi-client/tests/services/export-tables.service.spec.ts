import { TestBed } from '@angular/core/testing';
import { ExportTablesService } from '../../src/app/services/export-tables.service';

describe('NavigationBarService', () => {
  let service: ExportTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
