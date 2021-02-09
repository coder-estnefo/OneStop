import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPropertiesPage } from './view-properties.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPropertiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPropertiesPageRoutingModule {}
