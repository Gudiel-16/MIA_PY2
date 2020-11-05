import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-productos-mas-megusta',
  templateUrl: './reporte-productos-mas-megusta.component.html',
  styleUrls: ['./reporte-productos-mas-megusta.component.css']
})
export class ReporteProductosMasMegustaComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getreporteProductosMasMegusta().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
