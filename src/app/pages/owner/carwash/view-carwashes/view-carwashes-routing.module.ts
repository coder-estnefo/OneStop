import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCarwashesPage } from './view-carwashes.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCarwashesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCarwashesPageRoutingModule {}
