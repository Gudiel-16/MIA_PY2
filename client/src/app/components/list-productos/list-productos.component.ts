import { Component, OnInit, HostBinding } from '@angular/core';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos servicios
import { ProductosService } from '../../services/productos.service';

import { Cliente } from 'src/app/models/registroCliente';
import { Carrito } from '../../models/carrito_Interface';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  //agregando una fila a todo el componente (para que se coloque uno al lado del otro)
  //@HostBinding('class') classes='row';

  //arreglo
  misProductos: any =[];
  misCategorias: any =[];

  miPalClave:string="";
  tipoPrecio:string="TIPO DE ORDEN";
  nomCatBuscar:string="SELEC CATEGORIA";
  cantidadAdd:number=1;

  micarrito:Carrito={
    cantidad:0,
    precio:0,
    subtotal:0,
    id_producto:0,
    id_c:0,
    nom_producto:"",
    id_vendedor:0
  }

  idCliente:number=0;

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  //variable tipo ProductosService
  constructor(private service:ProductosService, private ngbModal:NgbModal) { }

  ngOnInit(): void {

    let d_json=this.service.getClienteLS();
    //obtengo el id del cliente
    if(d_json){
      let cliente:Cliente=d_json;
      this.micarrito.id_c=cliente.id_c;
      this.idCliente=cliente.id_c;

      //mando a llamar todos los productos
      this.service.getProductos(this.idCliente).subscribe(
        res=>{
          //lleno array de productos
          this.misProductos=res;
          //console.log(this.misProductos[2][4]);
          //const si=this.misProductos[2][4];
        // console.log(si*2);
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
      this.service.getProductoPorPalabraClave(this.miPalClave,this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  buscarPorPrecio(){
    if(this.tipoPrecio=="Precio ASC"){
      this.service.getProductosPrecioASC(this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }else if(this.tipoPrecio=="Precio DESC"){
      this.service.getProductosPrecioDESC(this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  buscarPorCategoria(){
    if(this.nomCatBuscar!="SELEC CATEGORIA"){
      this.service.getProductoPorCategoria(this.nomCatBuscar,this.idCliente).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  abrirVentanaCantidad(contenido,id_producto,precio,nom_producto,id_vended){
    //obtengo precio e id del producto y lo guardo
    this.micarrito.precio=precio;
    this.micarrito.id_producto=id_producto;
    this.micarrito.nom_producto=nom_producto;
    this.micarrito.id_vendedor=id_vended;

    //muestro mensaje por pantalla
    this.ngModalOption.backdrop='static';
    this.ngModalOption.keyboard=true;
    this.ngModalOption.centered=true;
    this.ngbModal.open(contenido,this.ngModalOption);  
  }

  addCarrito(){

    //guardo la cantidad ingresada por el usuario, y calculo el subtotal para guardarlo
    this.micarrito.cantidad=this.cantidadAdd;
    let sub=this.micarrito.cantidad*this.micarrito.precio;
    this.micarrito.subtotal=sub;
    //envio a LS
    this.service.addCarritoLS(this.micarrito);
    this.aceptar();
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }

}
