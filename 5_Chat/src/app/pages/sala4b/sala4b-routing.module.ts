import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sala4bPage } from './sala4b.page';

const routes: Routes = [
  {
    path: '',
    component: Sala4bPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sala4bPageRoutingModule {}
