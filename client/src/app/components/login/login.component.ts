import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/models/registroCliente'

//ngBootstrap
import { NgbModal,NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'
import { Administrador } from 'src/app/models/admin_Interface';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //para darle propiedades a ngBootstrap
  ngModalOption:NgbModalOptions={};

  constructor(private service:ProductosService, private router:Router, private ngbModal:NgbModal ) { }

  alert:boolean=false;
  
  ngOnInit(): void {
  }

  miCorreo: string=""
  miPass:string="";
  micheck:boolean=false;
  correoRec:string=""

  ingresar(){

    //si es admin
    if(this.micheck){
      this.service.loginAdmin(this.miCorreo,this.miPass).subscribe((res)=>{
        //si es true
        if(res['msg']){

          let datosUser:Administrador=res['datauser']; //informacion del admin
          this.service.setAdminLS(datosUser); //guardo en localStorage (LS)

          //guardo en bitacora
          let fecha=new Date();
          let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
          this.service.saveBitacora(this.miCorreo,"Inicio Sesion",fechaa).subscribe(
            res=>{              
              this.alert=false;
              this.router.navigate(['admin']); //navego a admin            
            },
            err=>console.error(err)
          );   
          
        }else{
          this.alert=true;
        }  
      });

    }else{
      this.service.loginUsuario(this.miCorreo,this.miPass).subscribe((res)=>{
        //si es true
        if(res['msg']){
          let datosUser:Cliente=res['datauser']; //informacion del cliente
          this.service.setClienteLS(datosUser); //guardo en localStorage (LS)

          //guardo en bitacora
          let fecha=new Date();
          let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
          this.service.saveBitacora(this.miCorreo,"Inicio Sesion",fechaa).subscribe(
            res=>{
              this.alert=false;
              this.router.navigate(['usuario']); //navego a usuario          
            },
            err=>console.error(err)
          );  
          
        }else{
          this.alert=true;
        }  
      });
    }
    
  }

  registro(){
    this.router.navigate(['/login/registro']);
  }

  recPass(contenido){
    //mostramos msj en pantalla
    this.ngModalOption.backdrop='static';
    this.ngModalOption.keyboard=true;
    this.ngModalOption.centered=true;
    this.ngbModal.open(contenido,this.ngModalOption);  
  }

  aceptar(){
    this.ngbModal.dismissAll(); //cerrar model
  }

  ejecutar(){
    if (this.correoRec!=""){
      this.service.getDateClienteRecPass(this.correoRec).subscribe(
        res=>{
          console.log(res);
          //enviando a LS
          let cliente:Cliente;
          cliente=res["datauser"];
          this.service.setClienteLSRecPass(cliente);

          //enviando correo
          this.service.envCorreoRecPass(this.correoRec).subscribe(
            res=>{
              this.ngbModal.dismissAll(); //cerrar model
            },
            err=>console.error(err)
          );
          
        },
        err=>console.error(err)
      );
    }
  }

}
