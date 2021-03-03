import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCarwashPage } from './add-carwash.page';

const routes: Routes = [
  {
    path: '',
    component: AddCarwashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCarwashPageRoutingModule {}
