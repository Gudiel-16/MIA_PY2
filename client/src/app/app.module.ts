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
import { ReporteProductosMasVendidosComponent } from './components/reporte-productos-mas-vendidos/reporte-productos-mas-vendidos.component';
import { ReporteProductosMasMegustaComponent } from './components/reporte-productos-mas-megusta/reporte-productos-mas-megusta.component';
import { ReporteProductosMasNomegustaComponent } from './components/reporte-productos-mas-nomegusta/reporte-productos-mas-nomegusta.component';
import { ReporteClienteMasCreditoComponent } from './components/reporte-cliente-mas-credito/reporte-cliente-mas-credito.component';
import { ReporteClienteMasDenunciasComponent } from './components/reporte-cliente-mas-denuncias/reporte-cliente-mas-denuncias.component';
import { ReporteClienteMasPublicacionesComponent } from './components/reporte-cliente-mas-publicaciones/reporte-cliente-mas-publicaciones.component';
import { ReportePaisesCreditoProductoComponent } from './components/reporte-paises-credito-producto/reporte-paises-credito-producto.component';

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
    CategoriasComponent,
    CarritoComponent,
    ComentariosComponent,
    DenunciasComponent,
    ProductosBloqueadosComponent,
    ReporteBitacoraComponent,
    ChatComponent,
    MisProductosComponent,
    DetalleMiProductoComponent,
    ComentariosMiProductoComponent,
    ChatMiProductoComponent,
    BienvenidaClienteComponent,
    ReporteProductosMasVendidosComponent,
    ReporteProductosMasMegustaComponent,
    ReporteProductosMasNomegustaComponent,
    ReporteClienteMasCreditoComponent,
    ReporteClienteMasDenunciasComponent,
    ReporteClienteMasPublicacionesComponent,
    ReportePaisesCreditoProductoComponent
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
