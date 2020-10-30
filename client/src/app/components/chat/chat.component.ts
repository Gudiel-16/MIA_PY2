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
    id_c:0,
    text:'',
    name:''
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

  idProducto:number=0;
  misMensajes;
  eventName:string="send-message";


  constructor(private service:ProductosService, private router:Router, private activedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const id=this.activedRoute.snapshot.params.id;
    this.idProducto=id;

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
          this.usersChat.id_c=this.miClient.id_c;
          this.usersChat.name=this.miClient.nombre;
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
    this.service.emit(this.eventName,this.usersChat);
    this.usersChat.text="";
  }

}
