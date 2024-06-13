import {Routes } from '@angular/router';
import { LoginComponent } from './pages/usuarios/login/login.component';
import { GatosComponent } from './pages/gatos/gatos.component';
import { RegisterComponent } from './pages/usuarios/register/register.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'gatos', component: GatosComponent },
  // { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    // {
    //     path: '',
    //     component: LoginComponent,
    //     children: [
    //       {
    //         path: '',
    //         redirectTo: '/login',
    //         pathMatch: 'full'
    //       },
    //       {
    //         path: '',
    //         loadChildren: () => import('./pages/usuarios/usuarios.module').then(module => module.UsuariosModule)
    //       },
    //     ]
    //   },
      // {
      //   path: '',
      //   component: LoginComponent,
      //   //canActivate: [loginGuard],
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: 'login',
      //       pathMatch: 'full'
      //     },
      //     {
      //       path: 'usuarios',
      //       loadChildren: () => import('./pages/usuarios/usuarios.module').then(module => module.UsuariosModule)
      //     },
      //     {
      //       path: 'gatos',
      //       loadChildren: () => import('./pages/gatos/gatos.module').then(module => module.GatosModule)
      //     },
      //   ]
      // },



];
