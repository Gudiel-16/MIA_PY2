import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/listProductos';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

//importamos servicio de cloudinary
import { UploadService } from '../../../servicesCloudinary/upload.service';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { Cliente } from 'src/app/models/registroCliente';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],
  providers:[UploadService] //importamos como proveedor IMPORTANTE
})
export class AddProductoComponent implements OnInit {

  file:File;
  photoSelecter:string | ArrayBuffer;

  alert:boolean=false;

  miProduct: Producto={
    id_producto:0,
    nombre:'',
    descripcion:'',
    palab_clave:'',
    precio:null,
    ruta:'https://res.cloudinary.com/gudiel16/image/upload/v1603579987/testing_angular_cloudinary/sinFoto_epcdyw.png',
    nom_cat:'',
    id_c:1
  };

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  miPrecio:number=0;
  misCategorias: any =[];
  nomCatBuscar:string="SELEC CATEGORIA";

  correoCliente:string="";

  //instanciamos
  constructor(private _uploadService:UploadService, private service:ProductosService, private router:Router, private ngbModal:NgbModal ) { }

  ngOnInit(): void {
    
    //obtengo el json de LS, para capturar el id del cliente
    let d_json=this.service.getClienteLS();
    if(d_json){
      let cliente:Cliente=d_json;
      this.miProduct.id_c=cliente.id_c;
      this.correoCliente=cliente.correo;

      //actualizo combobox de categorias
      this.service.getCategorias().subscribe(
        res=>{
          this.misCategorias=res;
          //console.log(this.miProduct);
        },
        err=>console.error(err)
      );
      
    }else{
      console.log("err");
    }
  }

  async onPhotoSelected(event:HtmlInputEvent){
    if (event.target.files && event.target.files[0]){
      //convertimos y guardamos la imagen en 'file;
      this.file=<File>event.target.files[0];
      const reader=new FileReader();
      reader.onload=e=>this.photoSelecter=reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  addNewProducto(contenido){

    if(this.miProduct.nombre!=""&&this.miProduct.nom_cat!="SELEC CATEGORIA"&&this.miProduct.descripcion!=""
      &&this.miProduct.palab_clave!=""&& this.miPrecio!=0){
        
        //por si el numero viene en decimales
        this.miProduct.precio=this.miPrecio;
        //si no selecciona foto se enviara la misma ruta de image que ya tiene       
        if(this.file==null){
          //guardamos
          this.service.saveProducto(this.miProduct).subscribe(
            res=>{
              console.log(res);   
              //mostramos msj en pantalla
              this.ngModalOption.backdrop='static';
              this.ngModalOption.keyboard=true;
              this.ngModalOption.centered=true;
              this.ngbModal.open(contenido,this.ngModalOption); 

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
              //console.log(res.secure_url); //ruta a guardar en base de datos
              this.miProduct.ruta=res.secure_url;

              //guardamos en base de datos
              this.service.saveProducto(this.miProduct).subscribe(
                resp=>{               
                    console.log(resp);
                    let fecha=new Date();
                    let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
                    this.service.saveBitacora(this.correoCliente,"Inserto un nuevo producto",fechaa).subscribe(
                      res=>{
                        this.alert=false;
                        //mostramos msj en pantalla
                        this.ngModalOption.backdrop='static';
                        this.ngModalOption.keyboard=true;
                        this.ngModalOption.centered=true;
                        this.ngbModal.open(contenido,this.ngModalOption);  

                      },
                      err=>console.error(err)
                    );                                                  
                },
                errr=>console.error(errr)
              );
            },
            err=>console.error(err)
          );   
        }

    } else{
      this.alert=true;
    }   
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
    this.router.navigate(['usuario/misProductos']);
  }

}
