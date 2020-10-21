import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../services/productos.service'

@Injectable({
  providedIn: 'root'
})
export class OutsGuard implements CanActivate {

  //inicializamos servicio
  constructor(private services:ProductosService, private router:Router){}

  canActivate(){
    //importamos en app.module
    //aqui habia algo por default, lo borramos
    if(this.services.getClienteLS()){ //retorna si es true o false
      return true;
    }else{
      this.router.navigate(['/login']); //si no esta logueado me redirije a login para que meta sus datos
      return false;
    }
  }  
}
