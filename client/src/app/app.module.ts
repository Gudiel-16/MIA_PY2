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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationUsuarioComponent,
    ListProductosComponent,
    DetalleProductoComponent,
    AddProductoComponent,
    RegistroClienteComponent
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
