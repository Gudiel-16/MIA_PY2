import { Component, OnInit } from '@angular/core';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

import { Cliente } from 'src/app/models/registroCliente';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  constructor(private ngbModal:NgbModal,private service:ProductosService, private router:Router) { }

  miPass:string="";
  confPass:string="";

  ngOnInit(): void {
  }

  recuperar(contenido){

    if(this.miPass!="" && this.confPass!=""){
      if(this.miPass==this.confPass){
        //obtengo de LS
        let j_son=this.service.getClienteLSRecPass();
        //si no es null
        if(j_son){
          let cliente:Cliente=j_son;
          cliente.pass=this.miPass;

          //acuatlizamos cliente
          this.service.updatePassCliente(cliente).subscribe(
            res=>{
              this.ngModalOption.backdrop='static';
              this.ngModalOption.keyboard=true;
              this.ngModalOption.centered=true;
              this.ngbModal.open(contenido,this.ngModalOption); 
              this.service.deleteLSRecPass();
            },
            err=>console.error(err)
          );          
        }
      }
    }
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
    this.router.navigate(['/login']);
  }

}
