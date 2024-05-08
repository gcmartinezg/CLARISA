import { Component } from '@angular/core';
import { BiImplementationService } from '../../services/bi-implementation.service';
@Component({
  selector: 'app-bi-list',
  templateUrl: './bi-list.component.html',
  styleUrls: ['./bi-list.component.scss']
})
export class BiListComponent {
  reportsInformation: any[] = [];

  constructor(private biImplementationSE: BiImplementationService) {}
  ngOnInit(): void {
    this.getBiReportsWithCredentials();
  }
  getBiReportsWithCredentials() {
    this.biImplementationSE.getBiReports().subscribe(resp => {
      this.reportsInformation = resp;
    });
  }
}
