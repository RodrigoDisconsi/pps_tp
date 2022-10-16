import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonitasPage } from '../bonitas/bonitas.page';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: '',
    component: MenuPage,
    children : [
      {
        path: 'bonitas',
        loadChildren: () => import('../bonitas/bonitas.module').then( m => m.BonitasPageModule)
      },
      {
        path: 'feas',
        loadChildren: () => import('../feas/feas.module').then( m => m.FeasPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
