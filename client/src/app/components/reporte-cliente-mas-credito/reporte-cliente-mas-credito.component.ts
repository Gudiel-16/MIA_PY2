import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-cliente-mas-credito',
  templateUrl: './reporte-cliente-mas-credito.component.html',
  styleUrls: ['./reporte-cliente-mas-credito.component.css']
})
export class ReporteClienteMasCreditoComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getreporteClienteMasMenosCredito().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
