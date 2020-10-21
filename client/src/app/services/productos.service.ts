import { Injectable } from '@angular/core';

//para poder pedir datos (httpClient me va permitir poder hacer peticiones)
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos interfaz
import { Producto } from '../models/listProductos'
import { Cliente } from '../models/registroCliente'
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators'
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //guardamos direccion
  API_URI='http://localhost:3000'

  //creamos variable privada http
  constructor(private http:HttpClient, private router:Router) { }

  //para que headers sean json
  headers:HttpHeaders=new HttpHeaders({
    "Context-Type":"application/json"
  });

  //METODOS CLIENTE
  saveCliente(cliente : Cliente){
    return this.http.post(`${this.API_URI}/usuario/registro`,cliente);
  }

  //METODOS PRODUCTO
  getProductos(){
    return this.http.get(`${this.API_URI}/usuario/listProductos`);
  }

  getProducto(id:string){
    return this.http.get(`${this.API_URI}/usuario/listProductos/detalleProducto/${id}`);
  }

  saveProducto(producto: Producto){
    return this.http.post(`${this.API_URI}/usuario/addProducto`,producto);
  }

  //LOGIN
  login(correo,pass){
    const url="http://localhost:3000/login/ingresar";
    return this.http.post(`${this.API_URI}/login/ingresar`,
    {
      "correo":correo,
      "pass":pass
    },
    {headers:this.headers})
    .pipe(map(data=>data));
    
  }

  //SET a localStorage
  setClienteLS(cliente:Cliente){
    let user:string = JSON.stringify(cliente);
    localStorage.setItem('usuarioLogueado',user);
  }

  //GET de localStorage
  getClienteLS(){
    let user=localStorage.getItem('usuarioLogueado');
    if (!isNullOrUndefined(user)) {
      let user_json=JSON.parse(user);
      return user_json;
    }else{
      return null;
    }
  }

  //LOGOUT
  logoutLS(){
    //borramos y direccionamos
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']); //si no esta logueado me redirije a login para que meta sus datos
  }

}
