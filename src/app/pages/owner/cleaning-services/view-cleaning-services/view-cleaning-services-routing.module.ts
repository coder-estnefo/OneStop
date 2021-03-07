import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCleaningServicesPage } from './view-cleaning-services.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCleaningServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCleaningServicesPageRoutingModule {}
