import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-cliente-mas-publicaciones',
  templateUrl: './reporte-cliente-mas-publicaciones.component.html',
  styleUrls: ['./reporte-cliente-mas-publicaciones.component.css']
})
export class ReporteClienteMasPublicacionesComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getreporteClienteMasPublicaciones().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
