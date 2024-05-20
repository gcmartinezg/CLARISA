import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import BiComponent from '../../src/app/pages/bi/bi.component';

describe('BiComponent', () => {
  let component: BiComponent;
  let fixture: ComponentFixture<BiComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' })
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    test('should call runEvents', () => {
      const runEventsSpy = jest.spyOn(component, 'runEvents');
      component.ngOnInit();
      expect(runEventsSpy).toHaveBeenCalled();
    });
    test('should call getQueryParams', () => {
      const getQueryParamsSpy = jest.spyOn(component, 'getQueryParams');
      component.ngOnInit();
      expect(getQueryParamsSpy).toHaveBeenCalled();
    });
    test('should call getBiReportWithCredentialsByreportName', () => {
      const getBiReportWithCredentialsByreportNameSpy = jest.spyOn(
        component,
        'getBiReportWithCredentialsByreportName'
      );
      component.ngOnInit();
      expect(getBiReportWithCredentialsByreportNameSpy).toHaveBeenCalled();
    });
  });
  describe('reloadPage ', () => {
    test('should call reloadPage', () => {
      const reloadPageSpy = jest.spyOn(component, 'reloadPage');
      component.reloadPage();
      expect(reloadPageSpy).toHaveBeenCalled();
    });
  });
  describe('toggleFullScreen', () => {
    test('should call toggleFullScreen', () => {
      const toggleFullScreenSpy = jest.spyOn(component, 'toggleFullScreen');
      component.toggleFullScreen();
      expect(toggleFullScreenSpy).toHaveBeenCalled();
    });
  });

  describe('exitFullScreen', () => {
    test('should call exitFullScreen', () => {
      const exitFullScreenSpy = jest.spyOn(component, 'exitFullScreen');
      component.exitFullScreen();
      expect(exitFullScreenSpy).toHaveBeenCalled();
    });
  });
  describe('exitFullScreenVendorSpecific', () => {
    test('should call exitFullScreenVendorSpecific', () => {
      const exitFullScreenVendorSpecificSpy = jest.spyOn(component, 'exitFullScreenVendorSpecific');
      component.exitFullScreenVendorSpecific();
      expect(exitFullScreenVendorSpecificSpy).toHaveBeenCalled();
    });
  });
  describe('biHeight', () => {
    test('should call biHeight', () => {
      const biHeightSpy = jest.spyOn(component, 'biHeight');
      component.biHeight();
      expect(biHeightSpy).toHaveBeenCalled();
    });
  });
  describe('validateBAckResponseProcess', () => {
    test('should call validateBAckResponseProcess', () => {
      const validateBAckResponseProcessSpy = jest.spyOn(component, 'validateBAckResponseProcess');
      component.validateBAckResponseProcess({ token: 'testToken', azureValidation: 1 });
      expect(validateBAckResponseProcessSpy).toHaveBeenCalled();
    });
  });
  describe('gATracking', () => {
    test('should call gATracking', () => {
      const gATrackingSpy = jest.spyOn(component, 'gATracking');
      component.gATracking('testReportName');
      expect(gATrackingSpy).toHaveBeenCalled();
    });
  });
  describe('reportDescriptionInnerHtml', () => {
    test('should call reportDescriptionInnerHtml', () => {
      const reportDescriptionInnerHtmlSpy = jest.spyOn(component, 'reportDescriptionInnerHtml');
      component.reportDescriptionInnerHtml();
      expect(reportDescriptionInnerHtmlSpy).toHaveBeenCalled();
    });
  });
});
