import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NavigationUsuarioComponent } from './components/navigation-usuario/navigation-usuario.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component'
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component'
import { AddProductoComponent } from './components/add-producto/add-producto.component'
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component'
import { CuentaConfirmadaComponent } from './components/cuenta-confirmada/cuenta-confirmada.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { NavigationAdminComponent } from './components/navigation-admin/navigation-admin.component';
import { PerfilAdminComponent } from './components/perfil-admin/perfil-admin.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { DenunciasComponent } from './components/denuncias/denuncias.component';
import { ProductosBloqueadosComponent } from './components/productos-bloqueados/productos-bloqueados.component';
import { ReporteBitacoraComponent } from './components/reporte-bitacora/reporte-bitacora.component';
import { ChatComponent } from './components/chat/chat.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { DetalleMiProductoComponent } from './components/detalle-mi-producto/detalle-mi-producto.component';
import { ComentariosMiProductoComponent } from './components/comentarios-mi-producto/comentarios-mi-producto.component';
import { ChatMiProductoComponent } from './components/chat-mi-producto/chat-mi-producto.component';
import { BienvenidaClienteComponent } from './components/bienvenida-cliente/bienvenida-cliente.component';

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
  },
  {
    path:'login/recuperarPassword',
    component: RecuperarPasswordComponent
  },
  {
    path:'admin',
    component: NavigationAdminComponent
  },
  {
    path:'admin/perfil',
    component: PerfilAdminComponent,
    //canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  },
  {
    path:'admin/categorias',
    component: CategoriasComponent,
    //canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  } ,
  {
    path:'admin/denuncias',
    component: DenunciasComponent,
    //canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  }  ,
  {
    path:'admin/productosBloqueados',
    component: ProductosBloqueadosComponent,
    //canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  }  
  ,
  {
    path:'usuario',
    component: BienvenidaClienteComponent,
    //canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  },
  {
    path:'usuario/perfil',
    component: PerfilUsuarioComponent,
    //canActivate:[OutsGuard] //esto hace que no entre un usuario, sino esta logueado
  },
  {
    path:'usuario/listProductos',
    component: ListProductosComponent
  },
  {
    path:'usuario/misProductos',
    component: MisProductosComponent
  },
  {
    path:'usuario/addProducto',
    component: AddProductoComponent
  },
  {
    path:'usuario/carrito',
    component: CarritoComponent
  },
  {
    path:'usuario/listProductos/detalleProducto/:id',
    component: DetalleProductoComponent
  },
  {
    path:'usuario/misProductos/detalleMiProducto/:id',
    component: DetalleMiProductoComponent
  },
  {
    path:'usuario/listProductos/detalleProducto/:id/comentariosProducto/:id',
    component: ComentariosComponent
  },
  {
    path:'usuario/misProductos/detalleMiProducto/:id/comentariosMiProducto/:id',
    component: ComentariosMiProductoComponent
  },
  {
    path:'usuario/listProductos/detalleProducto/:id/chatProducto/:id',
    component: ChatComponent
  },
  {
    path:'usuario/misProductos/detalleMiProducto/:id/chatMiProducto/:id',
    component: ChatMiProductoComponent
  },
  {
    path:'admin/reporteBitacora',
    component: ReporteBitacoraComponent
  }    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
