import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sala4aPage } from './sala4a.page';

const routes: Routes = [
  {
    path: '',
    component: Sala4aPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sala4aPageRoutingModule {}
