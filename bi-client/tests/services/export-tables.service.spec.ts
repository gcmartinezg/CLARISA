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
  describe('localCsvToJson', () => {
    it('should return a list of Wscols', async () => {
      const csvText = 'a,b,c\n1,2,3\n4,5,6';
      const list = await service.localCsvToJson(csvText);
      expect(list).toEqual([
        { a: '1', b: '2', c: '3' },
        { a: '4', b: '5', c: '6' }
      ]);
    });
  });
  describe('exportExcel', () => {
    it('should export a list of Wscols to an excel file', async () => {
      const csvText = 'a,b,c\n1,2,3\n4,5,6';
      const fileName = 'test.xlsx';
      await service.exportExcel(csvText, fileName);
    });
  });
});
