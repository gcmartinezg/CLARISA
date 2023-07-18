import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarisaPanelRoutingModule } from './clarisa-panel-routing.module';
import { ClarisaPanelComponent } from './clarisa-panel.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [ClarisaPanelComponent, FooterComponent],
  imports: [
    CommonModule,
    ClarisaPanelRoutingModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
  ],
})
export class ClarisaPanelModule {}
