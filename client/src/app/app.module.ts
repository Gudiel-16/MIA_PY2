import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importamos modulo
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationUsuarioComponent } from './components/navigation-usuario/navigation-usuario.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';

//importamos el servicio
import { ProductosService } from './services/productos.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationUsuarioComponent,
    ListProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //importamos modulo
  ],
  providers: [
    ProductosService //tendra los metodos para poder pedir datos
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
