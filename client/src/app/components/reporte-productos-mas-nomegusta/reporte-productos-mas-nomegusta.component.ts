import { Component, OnInit } from '@angular/core';


//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-productos-mas-nomegusta',
  templateUrl: './reporte-productos-mas-nomegusta.component.html',
  styleUrls: ['./reporte-productos-mas-nomegusta.component.css']
})
export class ReporteProductosMasNomegustaComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getreporteProductosMasNoMegusta().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
