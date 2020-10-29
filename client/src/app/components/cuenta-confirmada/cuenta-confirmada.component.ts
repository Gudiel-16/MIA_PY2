import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service';

import { Cliente } from 'src/app/models/registroCliente';

@Component({
  selector: 'app-cuenta-confirmada',
  templateUrl: './cuenta-confirmada.component.html',
  styleUrls: ['./cuenta-confirmada.component.css']
})
export class CuentaConfirmadaComponent implements OnInit {

  constructor(private service:ProductosService, private router:Router) {  }

  ngOnInit(): void {
    this.ejectuar();
  }

  ejectuar(){
    
    let datosCLient=this.service.getClienteLSConfirm(); 
    let cliente:Cliente=datosCLient;
    if(datosCLient){ //no es null
      //actualizo client
        this.service.updateStateConfirmCliente(datosCLient).subscribe(
          res=>{
            //elimino de storage
            this.service.deleteLSConfirm();
            //guardo en bitacora
            let fecha=new Date();
            let fechaa=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' : '+fecha.getHours()+':'+fecha.getMinutes();
            this.service.saveBitacora(cliente.correo,"Confirmo su cuenta",fechaa).subscribe(
              res=>{

              },
              err=>console.error(err)
            );
          },
          err=>console.error(err)
        );
      
    }else{
      //error al confirmar
    }
  }

  irAGT(){
    this.router.navigate(['/login']);
  }

}
