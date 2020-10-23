import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {

  constructor(private router:Router, private service:ProductosService) { }

  ngOnInit(): void {
  }

  cerrarSecion(){
    this.service.logoutLS();
    this.router.navigate(['/login']); //si no esta logueado me redirije a login para que meta sus datos
  }

}