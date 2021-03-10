import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBusinessPage } from './edit-business.page';

const routes: Routes = [
  {
    path: '',
    component: EditBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBusinessPageRoutingModule {}
