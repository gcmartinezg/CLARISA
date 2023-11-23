import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EndpointsInformationService } from '../../services/endpoints-information.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() information: any;
  @Input() urlParams: any;
  arrayColumns = [];
  keysTable = [];
  responseJsonPrint: any;
  informationPrint: any;
  informationEndpoint: any;
  findColumns: string[] = [];
  first = 0;
  dialogVisible: boolean;
  rows = 10;
  loading: boolean = true;
  urlClarisa: string;
  constructor(private _manageApiService: EndpointsInformationService) {}

  ngOnInit(): void {
    this.loading = true;
    this.urlClarisa = environment.apiUrl;
  }

  ngOnChanges(paramsUrl: SimpleChanges) {
    this.loading = true;
    this.informationEndpoint = [];

    if (Object.keys(this.urlParams).length == 2) {
      let variableAux = paramsUrl['urlParams'].currentValue.namesubcategory
        .split('_')
        .join(' ');
      this.information.subcategories.find((x: any) => {
        if (variableAux != undefined) {
          if (x.name == variableAux) {
            this.informationPrint = x;
          }
        }
      });
    }
    if (Object.keys(this.urlParams).length == 3) {
      let variableAux = paramsUrl['urlParams'].currentValue.namesubcategory
        .split('_')
        .join(' ');
      let variableAuxi = paramsUrl['urlParams'].currentValue.nameEndpoint
        .split('_')
        .join(' ');
      this.information.subcategories.find((x: any) => {
        if (variableAux != undefined) {
          if (x.name == variableAux) {
            this.informationPrint = x;
          }
        }
      });
      this.informationPrint.endpoints.find((x: any) => {
        if (variableAux != undefined) {
          if (x.name == variableAuxi) {
            this.informationPrint = x;
          }
        }
      });
      this._manageApiService
        .getAnyEndpoint(this.informationPrint.route)
        .subscribe((resp) => {
          this.informationEndpoint = resp;
          this.loading = false;
        });
    }
  }

  iniciativeEndInformation() {
    let auxVariable = JSON.parse(this.informationPrint.response_json);
    this.arrayColumns = this.columnsTable(auxVariable.properties);
    this.findColumns = [];
    for (let i of this.arrayColumns) {
      this.findColumns.push(i[1]);
    }

    return this.arrayColumns;
  }

  returnResponseJson() {
    let auxVariable = JSON.parse(this.informationPrint.response_json);
    this.responseJsonPrint = this.jsonResponse(
      auxVariable.properties,
      auxVariable.object_type
    );

    return JSON.stringify(this.responseJsonPrint, null, 4);
  }

  //In this function we organize the response in json type.
  jsonResponse(jsonStr, typeJson) {
    let responseJson;
    let auxList = jsonStr;

    if (typeJson == 'list') {
      responseJson = [{}];
    }
    if (typeJson == 'object') {
      responseJson = {};
    }

    for (let i in auxList) {
      if (Array.isArray(responseJson)) {
        if (auxList[i].object_type == 'field') {
          responseJson[0][i] = auxList[i].type;
        }
        if (auxList[i].object_type == 'object') {
          responseJson[0][i] = this.jsonResponse(
            auxList[i].properties,
            auxList[i].object_type
          );
        }
        if (auxList[i].object_type == 'list') {
          responseJson[0][i] = this.jsonResponse(
            auxList[i].properties,
            auxList[i].object_type
          );
        }
      }
      if (
        Array.isArray(responseJson) == false &&
        typeof responseJson == 'object'
      ) {
        if (auxList[i].object_type == 'field') {
          responseJson[i] = auxList[i].type;
        }
        if (auxList[i].object_type == 'object') {
          responseJson[i] = this.jsonResponse(
            auxList[i].properties,
            auxList[i].object_type
          );
        }
        if (auxList[i].object_type == 'list') {
          responseJson[0][i] = this.jsonResponse(
            auxList[i].properties,
            auxList[i].object_type
          );
        }
      }
    }

    return responseJson;
  }

  columnsTable(listaAux) {
    let endpointJsonOnes = listaAux;
    let columns = [];
    for (let i in endpointJsonOnes) {
      if (
        endpointJsonOnes[i].show_in_table == true &&
        endpointJsonOnes[i].object_type != 'object' &&
        endpointJsonOnes[i].object_type != 'list'
      ) {
        columns[endpointJsonOnes[i].order] = [
          endpointJsonOnes[i].column_name,
          i,
          endpointJsonOnes[i].object_type,
        ];
      }
      if (endpointJsonOnes[i].object_type == 'object') {
        if (endpointJsonOnes[i].show_in_table == true) {
          columns[endpointJsonOnes[i].order] = [
            endpointJsonOnes[i].column_name,
            i,
            endpointJsonOnes[i].object_type,
            this.columnsTable(endpointJsonOnes[i].properties),
          ];
        }
      }
      if (endpointJsonOnes[i].object_type == 'list') {
        if (endpointJsonOnes[i].show_in_table == true) {
          columns[endpointJsonOnes[i].order] = [
            endpointJsonOnes[i].column_name,
            i,
            endpointJsonOnes[i].object_type,
            this.columnsTable(endpointJsonOnes[i].properties),
          ];
        }
      }
    }
    return columns;
  }

  exportPdf() {
    let d = new Date();
    let columns = [];
    let information = [];
    this.arrayColumns.forEach((x) => {
      columns.push(x[0]);
    });
    for (let k of this.exportInformation()) {
      information.push(Object.values(k));
    }
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns],
      body: information,
      didDrawPage: (dataArg) => {
        doc.text(this.informationPrint.name, dataArg.settings.margin.left, 10);
      },
    });
    doc.save(
      'CLARISA_' +
        this.informationPrint.name +
        '_' +
        d.getFullYear() +
        (d.getMonth() + 1) +
        d.getDate() +
        d.getHours() +
        d.getMinutes() +
        '.pdf'
    );
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.exportInformation());
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'CLARISA_');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let d = new Date();
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName +
        this.informationPrint.name +
        '_' +
        d.getFullYear() +
        (d.getMonth() + 1) +
        d.getDate() +
        d.getHours() +
        d.getMinutes() +
        EXCEL_EXTENSION
    );
  }

  exportInformation() {
    let exportInformation = [];
    let objectFormat = {};
    let infoListUnque = '';
    let infoListObject = '';
    let infoObject = '';
    for (let i of this.informationEndpoint) {
      objectFormat = {};
      infoListUnque = '';
      infoListObject = '';
      infoObject = '';
      for (let k of this.arrayColumns) {
        if (k[2] == 'field') {
          objectFormat[k[0]] = i[k[1]];
        }
        if (k[2] == 'object') {
          if (i[k[1]] != null) {
            for (let j of k[3]) {
              if (j[0] != '' && j[0] != null) {
                infoObject = infoObject + k[0] + ' : ' + i[k[1]][j[1]] + '\n';
                objectFormat[k[0]] = infoObject;
              }
              if (j[0] == '' || j[0] == null) {
                objectFormat[k[0]] = infoObject + i[k[1]][j[1]] + '\n';
              }
            }
          }
          if (i[k[1]] == null) {
            objectFormat[k[0]] = '';
          }
        }
        if (k[2] == 'list') {
          if (i[k[1]] != null) {
            if (k[3].length == 1) {
              for (let j of i[k[1]]) {
                infoListUnque += j[k[3][0][1]] + ',' + '\n';
              }

              objectFormat[k[0]] = infoListUnque;
            }
            if (k[3].length != 1) {
              for (let j of i[k[1]]) {
                for (let p of k[3]) {
                  if (p[0] != null && p[0] != '') {
                    infoListObject =
                      infoListObject + p[0] + ' : ' + j[p[1]] + '\n';
                  }
                  if (p[0] == null || p[0] == '') {
                    infoListObject = infoListObject + j[p[1]] + '\n';
                  }
                }
              }
              objectFormat[k[0]] = infoListObject;
            }
          }
          if (i[k[1]] == null) {
            objectFormat[k[0]] = '';
          }
        }
      }
      exportInformation.push(objectFormat);
    }

    return exportInformation;
  }

  showDialog() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }
}
