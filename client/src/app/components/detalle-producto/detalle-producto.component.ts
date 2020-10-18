import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/listProductos';

//importamos para tener acceso a las rutas
import { Router, ActivatedRoute } from '@angular/router';

//importamos servicio
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

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

  misProductos: any =[];

  constructor(private productosService:ProductosService, private router:Router, private activedRoute: ActivatedRoute  ) { }

  ngOnInit(): void {
    //obtengo los parametros que recibo, desde el 'boton detalle' que esta en 'lista productos'
    const params=this.activedRoute.snapshot.params;
    //si contiene un id
    if (params.id){
      this.productosService.getProducto(params.id).subscribe( //hago mi consulta
        res=>{
          //obtengo todo el json
          this.misProductos=res;
          //obtengo la parte 'rows' del json
          const fila=this.misProductos.rows;
          //converierto los valores en un array
          const array=fila[0];
          //asigno valores a interface
          this.miProduct.id_producto=array[0];
          this.miProduct.nombre=array[1];
          this.miProduct.descripcion=array[2];
          this.miProduct.palab_clave=array[3];
          this.miProduct.precio=array[4];
          this.miProduct.ruta=array[5];
          this.miProduct.nom_cat=array[6];
          this.miProduct.id_c=array[7];
        },
        err=>console.error(err)
      );
    }
  }

}
