import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  processes: any[] = [
    { name: 'Azure Authentication', step: 1, works: null },
    { name: 'PowerBI Platform', step: 2, works: null },
    { name: 'Application Backend', step: 3, works: null },
    { name: 'Embedded', step: 4, works: null }
  ];
  constructor() {}
}
