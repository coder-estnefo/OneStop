import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningDetailsPage } from './cleaning-details.page';

const routes: Routes = [
  {
    path: '',
    component: CleaningDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningDetailsPageRoutingModule {}
