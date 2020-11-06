import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-reporte-cliente-mas-denuncias',
  templateUrl: './reporte-cliente-mas-denuncias.component.html',
  styleUrls: ['./reporte-cliente-mas-denuncias.component.css']
})
export class ReporteClienteMasDenunciasComponent implements OnInit {

  misDatos: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getreporteClienteMasDenuncia().subscribe(
      res=>{
        this.misDatos=res;
      },
      err=>console.error(err)
    );
  }

}
