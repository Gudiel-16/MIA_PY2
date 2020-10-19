import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/registroCliente'

//importamos servicio de cloudinary
import { UploadService } from '../../../servicesCloudinary/upload.service'

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css'],
  providers:[UploadService] //importamos como proveedor
})
export class RegistroClienteComponent implements OnInit {

  //variables para mandar image a cloudinary
  file:File;
  photoSelecter:string | ArrayBuffer;

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

  //inicializammos (para cloudinary)
  constructor(private _uploadService:UploadService) { }

  ngOnInit(): void {
  }

  //se ejecuta cuando le damos click encima de la imagen
  onPhotoSelected(event:HtmlInputEvent): void{
    //si hay imagen seleccionada
    if (event.target.files && event.target.files[0]){
      //convertimos y guardamos la imagen en 'file;
      this.file=<File>event.target.files[0];
      const reader=new FileReader();
      reader.onload=e=>this.photoSelecter=reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  addNewCliente(){
    //para guardar imagen en cloudinary
    //metemos credenciales y enviamos image
    const data=new FormData();
    data.append('file',this.file);
    data.append('upload_preset','angular_cloudinary');
    data.append('cloud_name','gudiel16'); 

    this._uploadService.uploadImage(data).subscribe( 
      res=>{
        console.log(res);
        console.log(res.secure_url); //ruta a guardar en base de datos
      },
      err=>console.error(err)
     )
  }

}
