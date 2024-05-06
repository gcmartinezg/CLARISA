import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pbi from 'powerbi-client';
import { ExportTablesService } from './export-tables.service';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBDGoogleAnalytics } from 'ibdevkit';
import { VariablesService } from './variables.service';
import { ActivatedRoute } from '@angular/router';
import { BiFilter } from '../shared/bi.interface';

@Injectable({
  providedIn: 'root'
})
export class BiImplementationService {
  constructor(
    public http: HttpClient,
    private exportTablesSE: ExportTablesService,
    private variablesSE: VariablesService,
    private activatedRoute: ActivatedRoute
  ) {}

  apiBaseUrl = environment.apiBaseUrl + 'result-dashboard-bi';
  report: any;
  showExportSpinner = false;
  currentReportName = '';
  showGlobalLoader = true;

  getBiReports() {
    return this.http.get<any>(`${this.apiBaseUrl}/bi-reports`).pipe(
      map(resp => {
        return resp?.response;
      })
    );
  }

  getBiReportWithCredentialsById(reportId: string) {
    return this.http.get<any>(`${this.apiBaseUrl}/bi-reports/report/${reportId}`);
  }

  getBiReportWithCredentialsByreportName(body: any) {
    return this.http.post<any>(`${this.apiBaseUrl}/bi-reports/reportName`, body);
  }

  renderReport(
    { token, report, filters }: { token: string; report: any; filters: any },
    reportName: string,
    pageName?: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let embedUrl = report.embed_url;
      let embedReportId = report.resport_id;
      let config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: token,
        embedUrl: embedUrl,
        id: embedReportId,
        permissions: pbi.models.Permissions.All,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false
        },
        fullscreen: {
          enabled: true // Enables fullscreen mode
        },
        pageName
      };
      let embedContainer: any = document.getElementById('reportContainer');
      let powerbi = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      );
      this.report = powerbi.embed(embedContainer, config);

      this.report.off('loaded');
      this.report.on('loaded', () => {
        console.log('loaded');
        this.applyFilters(filters);
        this.variablesSE.processes[3].works = true;
        resolve(this.report);
        this.showGlobalLoader = false;

        this.report.getPages().then((pages: any) => {
          console.log(pages);
        });
      });

      this.report.on('pageChanged', (event: any) => {
        const page = event.detail.newPage;
        IBDGoogleAnalytics().trackPageView(this.convertNameToTitle(page.displayName));
      });

      this.report.on('error', (err: any) => {
        console.log('Error');
        console.error(err);
        this.variablesSE.processes[3].works = false;
        reject(err);
      });
      this.exportButton(this.report);
    });
  }

  convertVariableToList(variables: string, param_type: string) {
    let varsList = variables?.split(',');
    return param_type === 'int' ? varsList.map((v: string) => parseInt(v)) : varsList;
  }

  applyFilters(filters: any[]) {
    filters.forEach((filter: BiFilter) => {
      const variables = this.activatedRoute.snapshot.queryParams[filter?.variablename];
      console.log(filter);
      console.log(this.convertVariableToList(variables, filter?.param_type));
      const filterConfig = {
        $schema: 'https://powerbi.com/product/schema#basic',
        target: {
          table: filter?.table,
          column: filter?.column
        },
        operator: filter?.operator,
        values: this.convertVariableToList(variables, filter?.param_type)
      };

      console.log(JSON?.stringify(filterConfig));
      // Replace report's filters with the same target data field.
      try {
        this.report.updateFilters(pbi.models.FiltersOperations.Replace, [filterConfig]);
      } catch (errors) {
        console.error(errors);
      }
    });
  }

  convertNameToTitle = (reportPageName: string) => {
    const ttile = `${this.currentReportName} (${reportPageName})`;
    return ttile.replace(/-/g, ' ')?.charAt(0)?.toUpperCase() + ttile?.slice(1);
  };

  getReportName(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.report
        .getPages()
        .then((pages: pbi.Page[]) => {
          const activePage = pages.find(page => page.isActive);

          if (activePage) {
            resolve(activePage.displayName);
          } else {
            reject('No se pudo obtener el nombre de la página activa.');
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  exportButton(report: any) {
    // Insert here the code you want to run after the report is rendered
    // report.off removes all event handlers for a specific event
    report.off('bookmarkApplied');
    // report.on will add an event listener.
    report.on('bookmarkApplied', async (event: any) => {
      const bookmarkNameFound = await this.getBookmarkName(report, event.detail.bookmarkName);
      this.detectButtonAndTable(report, bookmarkNameFound);
    });
  }

  async getBookmarkName(report: any, bookmarkId: any) {
    const bookmarks = await report.bookmarksManager.getBookmarks();
    const bookmarkFound = bookmarks.find((bm: any) => bm.name == bookmarkId);
    return bookmarkFound?.displayName;
  }

  async detectButtonAndTable(report: any, bookmarkName: any) {
    if (bookmarkName.search('export_data') < 0) return;
    console.log('Exporting data...\n');
    this.showExportSpinner = true;
    try {
      const pages = await report.getPages();
      let page = pages.filter((page: any) => {
        return page.isActive;
      })[0];

      const visuals = await page.getVisuals();

      let visual = visuals.find((vv: any) => vv.title.search('export_data_table') >= 0);

      const result = await visual.exportData(pbi.models.ExportDataType.Summarized);

      const dateCETTime = new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Madrid',
        hour12: false
      });

      const dateCET =
        new Date().getFullYear() +
        ('0' + new Date().getDate().toLocaleString('es-ES')).slice(-2) +
        ('0' + (new Date().getMonth() + 1)).slice(-2);

      const dateText1 = dateCETTime.split(',');
      const dateTime = dateText1[1].split(':').join('');

      await this.exportTablesSE.exportExcel(
        result.data,
        `export_data_table_results_${dateCET}_${dateTime.trim()}CET`
      );
      IBDGoogleAnalytics().trackEvent('download xlsx', 'file name');
    } catch (errors) {
      console.error(errors);
    }

    this.showExportSpinner = false;
  }
}
