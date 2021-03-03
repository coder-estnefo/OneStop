import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCarwashPage } from './edit-carwash.page';

const routes: Routes = [
  {
    path: '',
    component: EditCarwashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCarwashPageRoutingModule {}
