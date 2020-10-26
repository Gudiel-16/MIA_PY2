import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service'

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { Cliente } from 'src/app/models/registroCliente';
import { map } from 'rxjs/operators';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  miMap=new Map<number,object>();

  alert=false;

  miClient: Cliente={
    id_c:1,
    nombre:'',
    apellido:'',
    correo:'',
    pais:'',
    fech_nac:'',
    pass:'',
    image:'',
    creditos:0,
    confirmacion:0
  };

  misProductos: any =[];
  total:number=0;

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  constructor(private service:ProductosService, private ngbModal:NgbModal) { }

  ngOnInit(): void {

    //obtengo numero de creditos
    let d_json=this.service.getClienteLS();
    if(d_json){
      let cliente:Cliente=d_json;
      this.service.getDatePerfil(cliente).subscribe(
        res=>{
          this.miClient=res['datauser'];
        },
        err=>console.error(err)
      );
    }else{
      console.log("err");
    }

    //lleno table con informacion del carrito
    let carr=this.service.getCarritoLS();    
    this.misProductos=carr;

    let contador=0;
    for (let celda of this.misProductos){
      let sub=celda['subtotal'];
      contador=contador+sub;
    }
    this.total=contador;
  }

  limpiar(){
    this.service.deleteCarritoLS();
    this.misProductos=[];
    this.total=0;
    this.alert=false;
  }

  comprar(){

    let creditos=this.miClient.creditos;
    
    if(creditos>this.total){

      for(let celda of this.misProductos){
        //json que ingresaremos
        let car;
        //array que nos retornara el getkey
        let arr;
        //obtenemos el json y guardamos
        car=celda;
        //obtenemos el array del metodo getkey
        arr=this.getKey(celda["id_vendedor"]);
        //lo metemos en el array
        arr.push(car);
        //si ya existe eliminamos
        this.miMap.delete(celda["id_vendedor"]);
        //ya eliminado, lo metemos de nuevo (para ingresarlo con los datos actualizados)
        this.miMap.set(celda["id_vendedor"],arr);
      }

    }else{
      this.alert=true;
    }

    //console.log(this.miMap);
  }

  getKey(id_v){
    //sera array a retornar
    let llave;
    //obtengo del mapa
    let llavesita=this.miMap.get(id_v);

    //si es null
    if(llavesita==null){
      //array vacio
      llave=[];
    }else{
      //si no es null, obtengo del mapa
      llave=this.miMap.get(id_v);      
    }

    return llave;
  }

}
