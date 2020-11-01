import { Component, OnInit } from '@angular/core';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos servicios
import { ProductosService } from '../../services/productos.service';

import { Cliente } from 'src/app/models/registroCliente';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

   //arreglo
   misProductos: any =[];
   misCategorias: any =[];

   miPalClave:string="";
    tipoPrecio:string="TIPO DE ORDEN";
  nomCatBuscar:string="SELEC CATEGORIA";

  idCliente:number=0;

   //para darle propiedades a ngBootstrap
   ngModalOption:NgbModalOptions={};

  constructor(private service:ProductosService, private ngbModal:NgbModal) { }

  ngOnInit(): void {
    let d_json=this.service.getClienteLS();
    //obtengo el id del cliente
    if(d_json){
      let cliente:Cliente=d_json;
      this.idCliente=cliente.id_c;
      //this.micarrito.id_c=cliente.id_c;

      //mando a llamar todos los productos
      this.service.getMisProductos(this.idCliente).subscribe(
        res=>{
          //lleno array de productos
          this.misProductos=res;
          
          //actualizo combobox de categorias
          this.service.getCategorias().subscribe(
            res=>{
              this.misCategorias=res
            },
            err=>console.error(err)
          );
        },
        err=>console.log(err)
      );      
    }else{
      console.log("err");
    }
  }

  buscarPorPalClave(){
    if(this.miPalClave!=""){
      this.service.getMiProductoPorPalabraClave(this.miPalClave,this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  buscarPorPrecio(){
    if(this.tipoPrecio=="Precio ASC"){
      this.service.getMiProductosPrecioASC(this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }else if(this.tipoPrecio=="Precio DESC"){
      this.service.getMiProductosPrecioDESC(this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  buscarPorCategoria(){
    if(this.nomCatBuscar!="SELEC CATEGORIA"){
      this.service.getMiProductoPorCategoria(this.nomCatBuscar,this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

}
