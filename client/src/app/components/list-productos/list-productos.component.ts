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
  misCategorias: any =[];

  miPalClave:string="";
  tipoPrecio:string="TIPO DE ORDEN";
  nomCatBuscar:string="SELEC CATEGORIA";

  //variable tipo ProductosService
  constructor(private service:ProductosService) { }

  ngOnInit(): void {
    //mando a llamar todos los productos
    this.service.getProductos().subscribe(
      res=>{
        //lleno array de productos
        this.misProductos=res;
        //console.log(this.misProductos[2][4]);
        //const si=this.misProductos[2][4];
       // console.log(si*2);
        //actualizo combobox de categorias
        this.service.getCategorias().subscribe(
          res=>{
            this.misCategorias=res
          },
          err=>console.error(err)
        );
      },
      err=>console.log(err)
    );
  }

  buscarPorPalClave(){
    if(this.miPalClave!=""){
      this.service.getProductoPorPalabraClave(this.miPalClave).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  buscarPorPrecio(){
    if(this.tipoPrecio=="Precio ASC"){
      this.service.getProductosPrecioASC().subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }else if(this.tipoPrecio=="Precio DESC"){
      this.service.getProductosPrecioDESC().subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }

  buscarPorCategoria(){
    if(this.nomCatBuscar!="SELEC CATEGORIA"){
      this.service.getProductoPorCategoria(this.nomCatBuscar).subscribe(
        res=>{
          this.misProductos=res;
        },
        err=>console.error(err)
      );
    }
  }


}
