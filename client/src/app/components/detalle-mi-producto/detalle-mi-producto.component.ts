import { Component, OnInit } from '@angular/core';

import { Producto } from 'src/app/models/listProductos';

//importamos servicio de cloudinary
import { UploadService } from '../../../servicesCloudinary/upload.service';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router, ActivatedRoute } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

import { Cliente } from 'src/app/models/registroCliente';
import { Reaccion } from '../../models/reaccion_Interface';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-detalle-mi-producto',
  templateUrl: './detalle-mi-producto.component.html',
  styleUrls: ['./detalle-mi-producto.component.css'],
  providers:[UploadService] //importamos como proveedor IMPORTANTE
})
export class DetalleMiProductoComponent implements OnInit {

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

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};
  misProductos: any =[];
  misCategorias: any =[];

  cantMegusta:number=0;
  cantNomegusta:number=0;

  //cantidad de productos que ingresa el usuario al agregar al carro
  cantidadAdd:number=1;

  //id que se le enviara a comentarios
  idProducto:number=0;

  //id cliente
  idCliente:number=0;
  correoCLiente:string="";

  //variables para mandar image a cloudinary
  file:File;
  photoSelecter:string | ArrayBuffer;

  constructor(private service:ProductosService, private router:Router, private activedRoute: ActivatedRoute, private ngbModal:NgbModal,private _uploadService:UploadService) { }

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
      this.idCliente=cliente.id_c;
      this.correoCLiente=cliente.correo;

        //si contiene un id
        if (params.id){
          this.service.getProducto(params.id).subscribe( //hago mi consulta
            res=>{
              //obtengo datos producto
              this.miProduct=res["dataproduct"];

              this.service.getCategorias().subscribe(
                res=>{
                  this.misCategorias=res

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

  //se ejecuta cuando le damos click encima de la imagen
  async onPhotoSelected(event:HtmlInputEvent){
    //si hay imagen seleccionada
    if (event.target.files && event.target.files[0]){
      //convertimos y guardamos la imagen en 'file;
      this.file=<File>event.target.files[0];
      const reader=new FileReader();
      reader.onload=e=>this.photoSelecter=reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  editar(contenido){
    console.log(this.miProduct.nom_cat);

    if(this.file==null){

      //guardamos en base de datos sin guardar image en cloudinary
      this.service.updateProducto(this.miProduct).subscribe(
        res=>{

          //guardo en bitacora
          let fecha=new Date();
          let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
          this.service.saveBitacora(this.correoCLiente,"Actualizo Datos de Producto",fechaa).subscribe(
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

    }else{

      //para guardar imagen en cloudinary
       //metemos credenciales y enviamos image
       const data=new FormData();
       data.append('file',this.file);
       data.append('upload_preset','angular_cloudinary');
       data.append('cloud_name','gudiel16'); 

       this._uploadService.uploadImage(data).subscribe(
        res=>{
          this.miProduct.ruta=res.secure_url;

          this.service.updateProducto(this.miProduct).subscribe(
            res=>{

              //guardo en bitacora
              let fecha=new Date();
              let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
              this.service.saveBitacora(this.correoCLiente,"Actualizo Datos de Producto",fechaa).subscribe(
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

    }
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }

}
