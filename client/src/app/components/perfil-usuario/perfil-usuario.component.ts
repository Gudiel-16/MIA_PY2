import { Component, OnInit } from '@angular/core';

//importamos servicio de cloudinary
import { UploadService } from '../../../servicesCloudinary/upload.service';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { Cliente } from 'src/app/models/registroCliente';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers:[UploadService] //importamos como proveedor IMPORTANTE
})
export class PerfilUsuarioComponent implements OnInit {

  //variables para mandar image a cloudinary
  file:File;
  photoSelecter:string | ArrayBuffer;

  alert:boolean=false;

  miClient: Cliente={
    id_c:1,
    nombre:'',
    apellido:'',
    correo:'',
    pais:'',
    fech_nac:'',
    pass:'',
    image:'',
    creditos:10000,
    confirmacion:0
  };

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  constructor(private _uploadService:UploadService, private ngbModal:NgbModal,private service:ProductosService, private router:Router) { } 

  ngOnInit(): void {
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

  updateCliente(contenido){
    //validamos que los campos esten llenos
    if (this.miClient.nombre!='' && this.miClient.apellido!='' && this.miClient.correo!='' 
    && this.miClient.pais!='' && this.miClient.fech_nac!='' && this.miClient.pass!=''){

      //si no selecciona foto se enviara la misma ruta de image que ya tiene
      if(this.file==null){

        //guardamos en base de datos sin guardar image en cloudinary
        this.service.updateDateCliente(this.miClient).subscribe(
          resp=>{               
             console.log(resp);

             //guardo en bitacora
             let fecha=new Date();
             let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
             this.service.saveBitacora(this.miClient.correo,"Actualizo sus datos",fechaa).subscribe(
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
           this.miClient.image=res.secure_url;

           //guardamos en base de datos
           this.service.updateDateCliente(this.miClient).subscribe(
             resp=>{               
                console.log(resp);
                //guardo en bitacora
                let fecha=new Date();
                let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
                this.service.saveBitacora(this.miClient.correo,"Actualizo sus datos",fechaa).subscribe(
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

             

   }else{
     this.alert=true;
   }
 }

 aceptar(){
  this.ngbModal.dismissAll(); //cerrar model
}

}
