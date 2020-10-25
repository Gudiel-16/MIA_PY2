import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-navigation-usuario',
  templateUrl: './navigation-usuario.component.html',
  styleUrls: ['./navigation-usuario.component.css']
})
export class NavigationUsuarioComponent implements OnInit {

  constructor(private router:Router, private service:ProductosService) { }

  ngOnInit(): void {
  }

  cerrarSecion(){
    this.service.logoutLS();
    this.router.navigate(['/login']); //si no esta logueado me redirije a login para que meta sus datos
  }

  perfil(){
    this.router.navigate(['/usuario/perfil']);
  }

  productos(){
    this.router.navigate(['/usuario/listProductos']);
  }

  agregProductos(){
    this.router.navigate(['/usuario/addProducto']);
  }

  carrito(){
    this.router.navigate(['/usuario/carrito']);
  }

}
