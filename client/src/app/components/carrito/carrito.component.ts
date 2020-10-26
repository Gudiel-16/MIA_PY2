import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service'

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

import { Cliente } from 'src/app/models/registroCliente';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  //guardaremos los productos que tiene cada vendedor
  miMap=new Map<number,object>();

  //por si no hay creditos suficintes
  alert=false;

  //Datos del vendedor
  correoVendedor:string="";
  nombreVendedor:string="";
  creditosVendedor:number=0;

  filasHTMLComprador:string="";
  filasHTML:string="";

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

  constructor(private service:ProductosService, private ngbModal:NgbModal,private router:Router) { }

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

  comprar(contenido){

    this.comprarr((yaEjecuto)=>{
      
      let fecha=new Date();
      let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
      let updateCreditos=this.miClient.creditos-this.total;
      this.service.updateCreditosCliente(updateCreditos,this.miClient.id_c).subscribe(
        res=>{
          this.service.envCorreoAComprador(fechaa,this.miClient.correo,this.miClient.nombre,this.filasHTMLComprador,this.total).subscribe(
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
    });
  }

  comprarr(done){

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

    if(creditos>this.total){
      let cont=0;
      for(let [key,value] of this.miMap){
        //console.log(key);
          this.service.getCorreoCliente(key).subscribe(
          res=>{
            this.correoVendedor=res["correo"];
            this.nombreVendedor=res["nombre"];
            this.creditosVendedor=res["creditos"];
            let arr=value;
            let totalVendedor=0;
            for(let celda in arr){
              //console.log(value[celda]);
              let fila=value[celda];
              this.concFilahtml(fila["nom_producto"],fila["precio"],fila["cantidad"],fila["subtotal"]);
              totalVendedor=totalVendedor+fila["subtotal"];
            }
            let updateCredit=this.creditosVendedor+totalVendedor;
            let idVendedor=key;
            //enviar correo
            let fecha=new Date();
            let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
            //console.log(this.filasHTML);            

            this.service.envCorreoAVendedor(fechaa,this.correoVendedor,this.nombreVendedor,this.filasHTML,totalVendedor,updateCredit,idVendedor).subscribe(
              res=>{
                console.log(res);
                cont=cont+1;  
                if(cont==this.miMap.size){
                  done("YA EJECUTO!");
                }
              },
              err=>console.error(err)
            );              
            
            this.filasHTML="";
            
          },
          err=>console.error(err)
        );        
      }
    }
    
  }

  actualizarCreditosCliente(updateCredit,key){
    console.log("UPDATE");
    console.log(updateCredit);
    console.log(key);
    this.service.updateCreditosCliente(updateCredit,key).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.error(err)
    );
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

  async concFilahtml(nom_producto,precio,cantidad,subtotal){
    this.filasHTML=this.filasHTML+ '<tr style="background-color:darkred; color: white;">\
      <td style="padding: 10px; text-align: center;">'+nom_producto+'\
      </td>\
      <td style="padding: 10px; text-align: center;">'+precio+'\
      </td>\
      <td style="padding: 10px; text-align: center;">'+cantidad+'\
      </td>\
      <td style="padding: 10px; text-align: center;">'+subtotal+'\
      </td>\
      </tr>';

    this.filasHTMLComprador=this.filasHTMLComprador+'<tr style="background-color:darkred; color: white;">\
    <td style="padding: 10px; text-align: center;">'+nom_producto+'\
    </td>\
    <td style="padding: 10px; text-align: center;">'+precio+'\
    </td>\
    <td style="padding: 10px; text-align: center;">'+cantidad+'\
    </td>\
    <td style="padding: 10px; text-align: center;">'+subtotal+'\
    </td>\
    </tr>';
  }

  aceptar(){
    //this.service.deleteCarritoLS();
    //this.misProductos=[];
    //this.total=0;
    this.ngbModal.dismissAll(); //cerrar model
    //this.router.navigate(['usuario/listProductos']);
  }

}
