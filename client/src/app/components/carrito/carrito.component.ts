import { Component, OnInit } from '@angular/core';

//importamos servicios
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  misProductos: any =[];
  total:number=0;

  constructor(private service:ProductosService) { }



  ngOnInit(): void {
    let carr=this.service.getCarritoLS();    
    this.misProductos=carr;
    console.log(this.misProductos);

    let contador=0;
    for (let celda of this.misProductos){
      let sub=celda['subtotal'];
      contador=contador+sub;
    }
    this.total=contador;
  }

}
