import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/models/registroCliente'

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ProductosService, private router:Router ) { }

  ngOnInit(): void {
  }

  miCorreo: string=""
  miPass:string="";

  ingresar(){
    this.service.login(this.miCorreo,this.miPass).subscribe((res)=>{

      //si es true
      if(res['msg']){
        let datosUser:Cliente=res['datauser']; //informacion del cliente
        this.service.setClienteLS(datosUser);
      }else{
        //no existe o no se a confirmado
      }

    })
  }

}
