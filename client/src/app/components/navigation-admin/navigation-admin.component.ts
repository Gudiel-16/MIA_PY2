import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

import { Administrador } from 'src/app/models/admin_Interface';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {

  constructor(private router:Router, private service:ProductosService) { }

  ngOnInit(): void {
  }

  perfil(){
    this.router.navigate(['/admin/perfil']);
  }

  denNot(){
    this.router.navigate(['/admin/denuncias']);
  }

  productosBloqueados(){
    this.router.navigate(['/admin/productosBloqueados']);
  }

  categorias(){
    this.router.navigate(['/admin/categorias']);
  }

  reportesBit(){
    this.router.navigate(['admin/reporteBitacora']);    
  }

  cerrarSecion(){
    let d_json=this.service.getClienteLS();
    if(d_json){
      //datos admin
      let admin:Administrador=d_json;
      let fecha=new Date();
      let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
      //guardo en bitacora
      this.service.saveBitacora(admin.correo,"Cerro Sesion",fechaa).subscribe(
        res=>{
          this.service.logoutLS();
          this.router.navigate(['/login']);
        },
        err=>console.error(err)
      ); 
    }  

    
  }

}
