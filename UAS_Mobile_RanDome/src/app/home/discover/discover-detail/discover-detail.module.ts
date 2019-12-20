import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiscoverDetailPage } from './discover-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiscoverDetailPage]
})
export class DiscoverDetailPageModule {}
