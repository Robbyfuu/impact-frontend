import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canLoad:[UsuarioGuard]
  },
  {
    path: 'usersList',
    loadChildren: () => import('./pages/user-list/user-list.module').then( m => m.UserListPageModule),
    canLoad:[UsuarioGuard],
    
  },
  {
    path: 'userUpdate',
    loadChildren: () => import('./pages/user-update/user-update.module').then( m => m.UserUpdatePageModule),
    canLoad:[UsuarioGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
