import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'animales',
    loadChildren: () => import('./pages/animales/animales.module').then( m => m.AnimalesPageModule)
  },
  {
    path: 'colores',
    loadChildren: () => import('./pages/colores/colores.module').then( m => m.ColoresPageModule)
  },
  {
    path: 'numeros',
    loadChildren: () => import('./pages/numeros/numeros.module').then( m => m.NumerosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
