import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-productos-mas-vendidos',
  templateUrl: './reporte-productos-mas-vendidos.component.html',
  styleUrls: ['./reporte-productos-mas-vendidos.component.css']
})
export class ReporteProductosMasVendidosComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getProductosMasVendidos().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
