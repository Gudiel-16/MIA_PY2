import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NavigationUsuarioComponent } from './components/navigation-usuario/navigation-usuario.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component'
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component'
import { AddProductoComponent } from './components/add-producto/add-producto.component'
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component'
import { CuentaConfirmadaComponent } from './components/cuenta-confirmada/cuenta-confirmada.component';

//para verificar si esta logueado o no, no deja pasar a otras paginas si no lo esta
import { OutsGuard } from './guards/outs.guard'

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
    path:'login/registro',
    component: RegistroClienteComponent
  },
  {
    path:'login/registro/confirmCuenta',
    component: CuentaConfirmadaComponent
  }
  ,
  {
    path:'usuario',
    component: NavigationUsuarioComponent,
    canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  },
  {
    path:'usuario/listProductos',
    component: ListProductosComponent
  },
  {
    path:'usuario/addProducto',
    component: AddProductoComponent
  },
  {
    path:'usuario/listProductos/detalleProducto/:id',
    component: DetalleProductoComponent
  },
  { //cuando se esta dentro de 'addProducto' y nos queremos pasar a 'listProductos' esta busca la ruta 'usuario/addProducto/listProductos'
    //entonces cuando pasa eso redireccionamos hacia donde es, para que no nos de error
    path:'usuario/addProducto/listProductos',
    redirectTo:'usuario/listProductos'
  },
  { //redireccionamos porque nos da error
    path:'usuario/listProductos/addProducto',
    redirectTo:'usuario/addProducto'
  },
  { //redireccionamos porque nos da error
    path:'usuario/listProductos/detalleProducto/:id/listProductos',
    redirectTo:'usuario/listProductos'
  },
  { //redireccionamos porque nos da error
    path:'usuario/listProductos/detalleProducto/:id/addProducto',
    redirectTo:'usuario/addProducto'
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
