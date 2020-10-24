import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importamos modulo (tiene que estar tambien por cloudinary)
import { HttpClientModule } from '@angular/common/http'

//importamos form
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationUsuarioComponent } from './components/navigation-usuario/navigation-usuario.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { AddProductoComponent } from './components/add-producto/add-producto.component'
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';

//ngBootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

//importamos el servicio
import { ProductosService } from './services/productos.service';
import { CuentaConfirmadaComponent } from './components/cuenta-confirmada/cuenta-confirmada.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { NavigationAdminComponent } from './components/navigation-admin/navigation-admin.component';
import { PerfilAdminComponent } from './components/perfil-admin/perfil-admin.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationUsuarioComponent,
    ListProductosComponent,
    DetalleProductoComponent,
    AddProductoComponent,
    RegistroClienteComponent,
    CuentaConfirmadaComponent,
    PerfilUsuarioComponent,
    NavigationAdminComponent,
    PerfilAdminComponent,
    RecuperarPasswordComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //importamos modulo
    FormsModule,
    NgbModule, 
  ],
  providers: [
    ProductosService //tendra los metodos para poder pedir datos
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
