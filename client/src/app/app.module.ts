import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationUsuarioComponent } from './components/navigation-usuario/navigation-usuario.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationUsuarioComponent,
    ListProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
