import { Component, OnInit } from '@angular/core';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

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
    if(datosCLient){ //no es null
      //actualizo client
        this.service.updateStateConfirmCliente(datosCLient).subscribe(
          res=>{
            //elimino de storage
            this.service.deleteLSConfirm();
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
