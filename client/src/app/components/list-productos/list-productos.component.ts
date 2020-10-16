import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

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
