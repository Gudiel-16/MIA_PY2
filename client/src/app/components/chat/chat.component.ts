import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router, ActivatedRoute } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

import { Cliente } from 'src/app/models/registroCliente';
import { Producto } from 'src/app/models/listProductos';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usersChat={
    name:'',
    image:'',
    text:'',
    fecha:'',
    id_producto:0,
    id_c:0
  }

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

  misMensajes;
  eventName:string="send-message";


  constructor(private service:ProductosService, private router:Router, private activedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const id=this.activedRoute.snapshot.params.id;
    this.usersChat.id_producto=id;

    this.service.listen('text-event').subscribe(
      res=>{
        this.misMensajes=res;
      },
      err=>console.error(err)
    );

    let d_json=this.service.getClienteLS();
    if(d_json){
      let cliente:Cliente=d_json;
      this.service.getDatePerfil(cliente).subscribe(
        res=>{
          this.miClient=res['datauser'];          
          this.usersChat.name=this.miClient.nombre;
          this.usersChat.id_c=this.miClient.id_c;
          this.usersChat.image=this.miClient.image;
        },
        err=>console.error(err)
      );
    }

    this.service.getProducto(id).subscribe( 
      res=>{
        this.miProduct=res["dataproduct"];
      },
      err=>console.error(err)
    );
  }

  miMensaje(){
    let fecha=new Date();
    let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
    this.usersChat.fecha=fechaa;
    this.service.emit(this.eventName,this.usersChat);
    this.usersChat.text="";
  }

}
