import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiComponent } from './bi.component';

const routes: Routes = [{ path: '', component: BiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiRoutingModule {}
