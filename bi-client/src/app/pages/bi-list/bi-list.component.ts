import { Component } from '@angular/core';
import { BiImplementationService } from '../../services/bi-implementation.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bi-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './bi-list.component.html',
  styleUrl: './bi-list.component.scss'
})
export default class BiListComponent {
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
