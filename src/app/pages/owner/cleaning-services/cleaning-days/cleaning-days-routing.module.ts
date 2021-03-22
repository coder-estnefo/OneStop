import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningDaysPage } from './cleaning-days.page';

const routes: Routes = [
  {
    path: '',
    component: CleaningDaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningDaysPageRoutingModule {}
