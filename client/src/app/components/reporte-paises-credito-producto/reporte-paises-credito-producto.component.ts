import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-paises-credito-producto',
  templateUrl: './reporte-paises-credito-producto.component.html',
  styleUrls: ['./reporte-paises-credito-producto.component.css']
})
export class ReportePaisesCreditoProductoComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getreportePaisesMasCreditoProducto().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
