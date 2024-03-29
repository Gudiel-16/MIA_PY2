import { Component, OnInit } from '@angular/core';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

import { Administrador } from 'src/app/models/admin_Interface';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  constructor(private ngbModal:NgbModal,private service:ProductosService, private router:Router) { }

  nomNewCat:string="";

  misCategorias: any =[];

  idAdmin:number=0;
  correoAdmin:string="";
  
  ngOnInit(): void {
    //obtengo categorias cuando entro a la pagina
    this.service.getCategorias().subscribe(
      res=>{
        this.misCategorias=res;
        //console.log(this.misCategorias);
      },
      err=>console.error(err)
    );

    let d_json=this.service.getAdminLS();
    //si no es nulo
    if(d_json){
      let admin:Administrador=d_json;  
      this.idAdmin=admin.id_ad;
      this.correoAdmin=admin.correo;
    }else{
      console.log("err");
    }
  }

  addCategoria(contenido){

    //si ingreso nombre
    if(this.nomNewCat!=""){
      //guardamos
      this.service.saveCategoria(this.idAdmin,this.nomNewCat).subscribe(
        res=>{
          //acutalizamos combobox
          this.service.getCategorias().subscribe(
            res=>{
              this.misCategorias=res;

              //guardo en bitacora
              let fecha=new Date();
              let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
              this.service.saveBitacora(this.correoAdmin,"Agrego una nueva categoria",fechaa).subscribe(
                res=>{
                  console.log(res);
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
        
    
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }

}
