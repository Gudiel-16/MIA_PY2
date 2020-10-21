import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/listProductos';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {

  miProduct: Producto={
    id_producto:0,
    nombre:'',
    descripcion:'',
    palab_clave:'',
    precio:null,
    ruta:'',
    nom_cat:'',
    id_c:1
  };

  //instanciamos
  constructor(private productosService:ProductosService, private router:Router ) { }

  ngOnInit(): void {
  }

  addNewProducto(){
    this.productosService.saveProducto(this.miProduct).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['usuario/listProductos']);
      },
      err=>console.error(err)
    );
  }

}