import { Component, OnInit } from '@angular/core';

//importamos servicio de cloudinary
import { UploadService } from '../../../servicesCloudinary/upload.service';

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { Administrador } from 'src/app/models/admin_Interface';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css'],
  providers:[UploadService] //importamos como proveedor IMPORTANTE
})
export class PerfilAdminComponent implements OnInit {

  //variables para mandar image a cloudinary
  file:File;
  photoSelecter:string | ArrayBuffer;

  miAdmin: Administrador={
    id_ad:1,
    nombre:'',
    apellido:'',
    correo:'',
    pais:'',
    fech_nac:'',
    pass:'',
    image:''
  };

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  constructor(private _uploadService:UploadService, private ngbModal:NgbModal,private service:ProductosService, private router:Router) { }

  ngOnInit(): void {
    let d_json=this.service.getAdminLS();
    if(d_json){
      let admin:Administrador=d_json;
      this.service.getDatePerfilAdmin(admin).subscribe(
        res=>{
          this.miAdmin=res['datauser'];
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

  updateAdmin(contenido){
    if (this.miAdmin.nombre!='' && this.miAdmin.apellido!='' && this.miAdmin.correo!='' 
    && this.miAdmin.pais!='' && this.miAdmin.fech_nac!='' && this.miAdmin.pass!=''){

      //si no selecciona foto se enviara la misma ruta de image que ya tiene
      if (this.file==null){
        //guardamos en base de datos sin guardar image en cloudinary
        this.service.updateDateAdmin(this.miAdmin).subscribe(
          resp=>{               
             console.log(resp);

             //guardo en bitacora
             let fecha=new Date();
             let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
             this.service.saveBitacora(this.miAdmin.correo,"Actualizo sus datos",fechaa).subscribe(
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
           this.miAdmin.image=res.secure_url;

           //guardamos en base de datos
           this.service.updateDateAdmin(this.miAdmin).subscribe(
             resp=>{               
                console.log(resp);
                
                //guardo en bitacora
                let fecha=new Date();
                let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
                this.service.saveBitacora(this.miAdmin.correo,"Actualizo sus datos",fechaa).subscribe(
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
             errr=>console.error(errr)
           );
         },
         err=>console.error(err)
       );    
      }
      
        

   }else{
     //elert error
   }
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }
  

} 
