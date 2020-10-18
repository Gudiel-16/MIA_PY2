import { Injectable } from '@angular/core';

//para poder pedir datos (httpClient me va permitir poder hacer peticiones)
import { HttpClient } from '@angular/common/http';
//importamos interfaz
import { Producto } from '../models/listProductos'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //guardamos direccion
  API_URI='http://localhost:3000'

  //creamos variable privada http
  constructor(private http:HttpClient) { }

  //METODOS
  getProductos(){
    return this.http.get(`${this.API_URI}/usuario/listProductos`);
  }

  getProducto(id:string){
    return this.http.get(`${this.API_URI}/usuario/listProductos/${id}`);
  }

  saveProducto(producto: Producto){
    return this.http.post(`${this.API_URI}/usuario/addProducto/`,producto);
  }
}
