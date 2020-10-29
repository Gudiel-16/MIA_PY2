import { Component, OnInit } from '@angular/core';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos servicios
import { ProductosService } from '../../services/productos.service';

import { Administrador } from 'src/app/models/admin_Interface';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  misDenuncias: any =[];

  correoAdmin:string="";

  constructor(private service:ProductosService, private ngbModal:NgbModal) { }

  ngOnInit(): void {
    //obtengo denuncias
    this.service.getDenuncias().subscribe(
      res=>{
        this.misDenuncias=res;
      },
      err=>console.error(err)
    );

    //obtengo el json de LS, para capturar el id del cliente
    let d_json=this.service.getClienteLS();
    if(d_json){
      let admin:Administrador=d_json;
      this.correoAdmin=admin.correo;      
    }else{
      console.log("err");
    }

  }

  bloquearProducto(id_producto,contenido){
    this.service.deleteProducto(id_producto).subscribe(
      res=>{
        this.service.deleteProductoEnDenuncia(id_producto).subscribe(
          res=>{
            this.service.getDenuncias().subscribe(
              res=>{
                this.misDenuncias=res;

                //guardo en bitacora
                let fecha=new Date();
                let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
                this.service.saveBitacora(this.correoAdmin,"Bloqueo un producto",fechaa).subscribe(
                  res=>{
                    //mostramos msj en pantalla
                    this.ngModalOption.backdrop='static';
                    this.ngModalOption.keyboard=true;
                    this.ngModalOption.centered=true;
                    this.ngbModal.open(contenido,this.ngModalOption);  
                  },
                  err=>console.error(err)
                );                
              },
              err=>console.error(err)
            );
          },
          err=>console.error(err)
        );
      },
      err=>console.error(err)
    );
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }



}
