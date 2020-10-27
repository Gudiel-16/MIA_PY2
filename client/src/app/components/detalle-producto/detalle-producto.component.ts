import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/listProductos';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router, ActivatedRoute } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

import { Cliente } from 'src/app/models/registroCliente';
import { Reaccion } from '../../models/reaccion_Interface'
import { Carrito } from '../../models/carrito_Interface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

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

  miReaccion:Reaccion={
    id_reaccion:0,
    megusta:0,
    nomegusta:0,
    id_producto:0,
    id_c:0
  }

  micarrito:Carrito={
    cantidad:0,
    precio:0,
    subtotal:0,
    id_producto:0,
    id_c:0,
    nom_producto:"",
    id_vendedor:0
  }

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};
  misProductos: any =[];

  cantMegusta:number=0;
  cantNomegusta:number=0;

  //cantidad de productos que ingresa el usuario al agregar al carro
  cantidadAdd:number=1;

  //id que se le enviara a comentarios
  idProducto:number=0;

  constructor(private service:ProductosService, private router:Router, private activedRoute: ActivatedRoute, private ngbModal:NgbModal) { }

  ngOnInit(): void {

    //obtengo los parametros que recibo, desde el 'boton detalle' que esta en 'lista productos'
    const params=this.activedRoute.snapshot.params;
    this.miReaccion.id_producto=params.id;
    this.idProducto=params.id;
    
    let d_json=this.service.getClienteLS();
    if(d_json){
      //guardo id de Cliente
      let cliente:Cliente=d_json;
      this.miReaccion.id_c=cliente.id_c;
      this.micarrito.id_c=cliente.id_c;

        //si contiene un id
        if (params.id){
          this.service.getProducto(params.id).subscribe( //hago mi consulta
            res=>{
              //obtengo todo el json
              this.misProductos=res;
              //obtengo la parte 'rows' del json
              const fila=this.misProductos;
              //converierto los valores en un array
              const array=fila[0];
              //asigno valores a interface
              this.miProduct.id_producto=array[0];
              this.miProduct.nombre=array[1];
              this.miProduct.descripcion=array[2];
              this.miProduct.palab_clave=array[3];
              this.miProduct.precio=array[4];
              this.miProduct.ruta=array[5];
              this.miProduct.nom_cat=array[6];
              this.miProduct.id_c=array[7];
              //obtengo cantidad de megusta
              this.service.reac_cantidadMeGusta(params.id).subscribe(
                resp=>{
                  let data=resp["data"];
                  this.cantMegusta=data["megusta"];
                  //obtengo la cantidad de no me gusta
                  this.service.reac_cantidadNoMeGusta(params.id).subscribe(
                    resp=>{
                      let data=resp["data"];
                      this.cantNomegusta=data["nomegusta"];
                    },
                    err=>console.log(err)
                  );
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

  updateNomegusta(){

    this.service.reac_idUsuarioIdClienteExistenteEnMismaFila(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
      res=>{
        //si ya esta registrado en la tabla
        if(res['msg']){
          this.service.reac_yaDioNoMeGusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
            res=>{
              //si aun no a dado nomegusta
              if(!res['msg']){
                this.service.reac_deMegustaAnomegusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
                  res=>{
                    console.log(res);
                    //obtengo cantidad de megusta
                    this.service.reac_cantidadMeGusta(this.miReaccion.id_producto).subscribe(
                      resp=>{
                        let data=resp["data"];
                        this.cantMegusta=data["megusta"];
                        //obtengo la cantidad de no me gusta
                        this.service.reac_cantidadNoMeGusta(this.miReaccion.id_producto).subscribe(
                          resp=>{
                            let data=resp["data"];
                            this.cantNomegusta=data["nomegusta"];
                          },
                          err=>console.log(err)
                        );
                      },
                      err=>console.error(err)
                    );
                  },
                  err=>console.error(err)
                );
              }
            },
            err=>console.log(err)
          );

          //si aun no esta en la tabla
        }else{
          this.service.reac_insertar(this.miReaccion).subscribe(
            res=>{
              this.service.reac_yaDioNoMeGusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
                res=>{
                  //si aun no a dado nomegusta
                  if(!res['msg']){
                    this.service.reac_deMegustaAnomegusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
                      res=>{
                        console.log(res);
                        //obtengo cantidad de megusta
                        this.service.reac_cantidadMeGusta(this.miReaccion.id_producto).subscribe(
                          resp=>{
                            let data=resp["data"];
                            this.cantMegusta=data["megusta"];
                            //obtengo la cantidad de no me gusta
                            this.service.reac_cantidadNoMeGusta(this.miReaccion.id_producto).subscribe(
                              resp=>{
                                let data=resp["data"];
                                this.cantNomegusta=data["nomegusta"];
                              },
                              err=>console.log(err)
                            );
                          },
                          err=>console.error(err)
                        );
                      },
                      err=>console.error(err)
                    );
                  }
                },
                err=>console.log(err)
              );
            },
            err=>console.error(err)
          );
        }
      },
      err=>console.error(err)
    );   
    
  }

  updatemegusta(){
    this.service.reac_idUsuarioIdClienteExistenteEnMismaFila(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
      res=>{
        //si ya esta registrado en la tabla
        if(res['msg']){
          this.service.reac_yaDioMeGusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
            res=>{
              //si aun no a dado megusta
              if(!res['msg']){
                this.service.reac_deNoegustaAmegusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
                  res=>{
                    console.log(res);
                    //obtengo cantidad de megusta
                    this.service.reac_cantidadMeGusta(this.miReaccion.id_producto).subscribe(
                      resp=>{
                        let data=resp["data"];
                        this.cantMegusta=data["megusta"];
                        //obtengo la cantidad de no me gusta
                        this.service.reac_cantidadNoMeGusta(this.miReaccion.id_producto).subscribe(
                          resp=>{
                            let data=resp["data"];
                            this.cantNomegusta=data["nomegusta"];
                          },
                          err=>console.log(err)
                        );
                      },
                      err=>console.error(err)
                    );
                  },
                  err=>console.error(err)
                );
              }
            },
            err=>console.log(err)
          );

          //si aun no esta en la tabla
        }else{
          this.service.reac_insertar(this.miReaccion).subscribe(
            res=>{
              this.service.reac_yaDioMeGusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
                res=>{
                  //si aun no a dado nomegusta
                  if(!res['msg']){
                    this.service.reac_deNoegustaAmegusta(this.miReaccion.id_c,this.miReaccion.id_producto).subscribe(
                      res=>{
                        console.log(res);
                        //obtengo cantidad de megusta
                        this.service.reac_cantidadMeGusta(this.miReaccion.id_producto).subscribe(
                          resp=>{
                            let data=resp["data"];
                            this.cantMegusta=data["megusta"];
                            //obtengo la cantidad de no me gusta
                            this.service.reac_cantidadNoMeGusta(this.miReaccion.id_producto).subscribe(
                              resp=>{
                                let data=resp["data"];
                                this.cantNomegusta=data["nomegusta"];
                              },
                              err=>console.log(err)
                            );
                          },
                          err=>console.error(err)
                        );
                      },
                      err=>console.error(err)
                    );
                  }
                },
                err=>console.log(err)
              );
            },
            err=>console.error(err)
          );
        }
      },
      err=>console.error(err)
    );   
  }

  abrirVentanaCantidad(contenido){
    //obtengo precio e id del producto y lo guardo
    this.micarrito.precio=this.miProduct.precio;
    this.micarrito.id_producto=this.miProduct.id_producto;
    this.micarrito.nom_producto=this.miProduct.nombre;
    this.micarrito.id_vendedor=this.miProduct.id_c;

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
