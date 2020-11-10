import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

import { Cliente } from 'src/app/models/registroCliente';

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
    let d_json=this.service.getClienteLS();
    if(d_json){
      //guardo id de Cliente
      let cliente:Cliente=d_json;
      let fecha=new Date();
      let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
      //guardo en bitacora
      //guardo en bitacora
      this.service.saveBitacora(cliente.correo,"Cerro Sesion",fechaa).subscribe(
        res=>{
          this.service.logoutLS();
          this.service.deleteCarritoLS();
          this.router.navigate(['/login']); //si no esta logueado me redirije a login para que meta sus datos
        },
        err=>console.error(err)
      ); 
    }    
  }

  inicio(){
    this.router.navigate(['/usuario']);
  }

  perfil(){
    this.router.navigate(['/usuario/perfil']);
  }

  productos(){
    this.router.navigate(['/usuario/listProductos']);
  }

  misProductos(){
    this.router.navigate(['/usuario/misProductos']);
  }

  agregProductos(){
    this.router.navigate(['/usuario/addProducto']);
  }

  carrito(){
    this.router.navigate(['/usuario/carrito']);
  }

}
