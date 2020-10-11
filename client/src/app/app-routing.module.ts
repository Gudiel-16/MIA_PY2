import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NavigationUsuarioComponent } from './components/navigation-usuario/navigation-usuario.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component'

//definimos las rutas
const routes: Routes = [

  {
    path:'', //sera la ruta principal
    redirectTo:'/login', //cuando es ruta principal, redirecciona a esta
    pathMatch:'full' //como es inicial va esto
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'usuario',
    component: NavigationUsuarioComponent
  },
  {
    path:'usuario/listProductos',
    component: ListProductosComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
