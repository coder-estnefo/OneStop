import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewingDatesPage } from './viewing-dates.page';

const routes: Routes = [
  {
    path: '',
    component: ViewingDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewingDatesPageRoutingModule {}
