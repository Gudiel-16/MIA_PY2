import { Component, OnInit } from '@angular/core';

import { Producto } from 'src/app/models/listProductos';
import { Cliente } from 'src/app/models/registroCliente';
import { Comentario } from '../../models/comentario_Interface';
import { Denuncia } from '../../models/denuncia_Inteface';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router, ActivatedRoute } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  miProduct: Producto={
    id_producto:0,
    nombre:'',
    descripcion:'',
    palab_clave:'',
    precio:null,
    ruta:'',
    nom_cat:'',
    id_c:1
  };

  miComent:Comentario={
    descripcion:"",
    fecha:"",
    id_producto:0,
    id_c:0
  }

  miDenuncia:Denuncia={
    descripcion:"",
    fecha:"",
    id_producto:0,
    id_c:0
  }

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};
  misComentarios: any =[];

  idCliente:number=0;
  idProducto:number=0;

  constructor(private service:ProductosService, private router:Router, private activedRoute: ActivatedRoute, private ngbModal:NgbModal) { }

  ngOnInit(): void {

    //obtengo los parametros que recibo, desde el 'boton comentarios' que esta en 'detalle producto'
    const params=this.activedRoute.snapshot.params;
    this.idProducto=params.id;
    this.miComent.id_producto=params.id;
    this.miDenuncia.id_producto=params.id;

    let d_json=this.service.getClienteLS();
    if(d_json){
      //guardo id de Cliente
      let cliente:Cliente=d_json;
      this.idCliente=cliente.id_c;
      this.miComent.id_c=cliente.id_c;
      this.miDenuncia.id_c=cliente.id_c;

        //si contiene un id
        if (params.id){
          this.service.getProducto(params.id).subscribe( //hago mi consulta
            res=>{
              //obtengo todo el json
              this.miProduct=res["dataproduct"];

              //obtengo comentarios
              this.service.getComentarios(this.idProducto).subscribe(
                res=>{
                  this.misComentarios=res;
                },
                err=>console.error(err)
              );

            },
            err=>console.error(err)
          );
        }
    }else{
      console.log("err");
    } 

  }

  addComentario(){
    if (this.miComent.descripcion!=""){
      let fecha=new Date();
      let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
      this.miComent.fecha=fechaa;
      this.service.saveComentario(this.miComent).subscribe(
        res=>{
          console.log(res);

          //obtengo comentarios actualizados
          this.service.getComentarios(this.idProducto).subscribe(
            res=>{
              this.misComentarios=res;
              this.miComent.descripcion=""; //para que limpie campo
            },
            err=>console.error(err)
          );
        },
        err=>console.error(err)
      );
    }else{
      //alert
    }
  }

  denunciarProructo(contenido){
    //mostramos msj en pantalla
    this.ngModalOption.backdrop='static';
    this.ngModalOption.keyboard=true;
    this.ngModalOption.centered=true;
    this.ngbModal.open(contenido,this.ngModalOption);  
  }

  ejecutar(contenidoRes){
    if(this.miDenuncia.descripcion!=""){
      let fecha=new Date();
      let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
      this.miDenuncia.fecha=fechaa;
      this.service.saveDenuncia(this.miDenuncia).subscribe(
        res=>{
          this.ngModalOption.backdrop='static';
          this.ngModalOption.keyboard=true;
          this.ngModalOption.centered=true;
          this.ngbModal.open(contenidoRes,this.ngModalOption); 
        },
        err=>console.error(err)
      );
    }
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }

}
