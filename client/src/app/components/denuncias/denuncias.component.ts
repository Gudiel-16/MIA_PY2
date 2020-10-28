import { Component, OnInit } from '@angular/core';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos servicios
import { ProductosService } from '../../services/productos.service';

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

  constructor(private service:ProductosService, private ngbModal:NgbModal) { }

  ngOnInit(): void {
    this.service.getDenuncias().subscribe(
      res=>{
        this.misDenuncias=res;
      },
      err=>console.error(err)
    );
  }

  bloquearProducto(id_producto,contenido){
    this.service.deleteProducto(id_producto).subscribe(
      res=>{
        this.service.deleteProductoEnDenuncia(id_producto).subscribe(
          res=>{
            this.service.getDenuncias().subscribe(
              res=>{
                this.misDenuncias=res;
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
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }



}
