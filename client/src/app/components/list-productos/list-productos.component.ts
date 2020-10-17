import { Component, OnInit, HostBinding } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  //agregando una fila a todo el componente (para que se coloque uno al lado del otro)
  //@HostBinding('class') classes='row';

  //arreglo
  misProductos: any =[];

  //variable tipo ProductosService
  constructor(private productosService:ProductosService) { }

  ngOnInit(): void {
    //mando a llamar todos los productos
    this.productosService.getProductos().subscribe(
      res=>{
        this.misProductos=res;
        console.log(this.misProductos.rows)
      },
      err=>console.log(err)
    );
  }

}
