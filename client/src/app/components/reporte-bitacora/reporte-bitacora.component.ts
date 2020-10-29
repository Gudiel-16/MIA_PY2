import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-bitacora',
  templateUrl: './reporte-bitacora.component.html',
  styleUrls: ['./reporte-bitacora.component.css']
})
export class ReporteBitacoraComponent implements OnInit {

  miBitacora: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getBitacoraASC().subscribe(
      res=>{
        this.miBitacora=res;
      },
      err=>console.error(err)
    );
  }

  ordenASC(){
    this.service.getBitacoraASC().subscribe(
      res=>{
        this.miBitacora=res;
      },
      err=>console.error(err)
    );
  }

  ordenDESC(){
    this.service.getBitacoraDESC().subscribe(
      res=>{
        this.miBitacora=res;
      },
      err=>console.error(err)
    );
  }

}
