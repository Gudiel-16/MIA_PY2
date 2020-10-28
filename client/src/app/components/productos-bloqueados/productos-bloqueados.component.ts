import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos-bloqueados',
  templateUrl: './productos-bloqueados.component.html',
  styleUrls: ['./productos-bloqueados.component.css']
})
export class ProductosBloqueadosComponent implements OnInit {

  misDenuncias: any =[];

  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    this.service.getProductosBloqueados().subscribe(
      res=>{
        this.misDenuncias=res;
      },
      err=>console.error(err)
    );
  }

}
