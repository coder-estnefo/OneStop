import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCarwashesPageRoutingModule } from './view-carwashes-routing.module';

import { ViewCarwashesPage } from './view-carwashes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCarwashesPageRoutingModule
  ],
  declarations: [ViewCarwashesPage]
})
export class ViewCarwashesPageModule {}
