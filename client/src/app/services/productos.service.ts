import { Injectable } from '@angular/core';

//para poder pedir datos (httpClient me va permitir poder hacer peticiones)
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//importamos interfaz
import { Producto } from '../models/listProductos'
import { Cliente } from '../models/registroCliente'
import { Reaccion } from '../models/reaccion_Interface';
import { Carrito } from '../models/carrito_Interface';
import { Administrador } from '../models/admin_Interface';
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

  //METODOS ADMIN
  loginAdmin(correo,pass){
    return this.http.post(`${this.API_URI}/login/ingresarAdmin`,
    {
      "correo":correo,
      "pass":pass
    },
    {headers:this.headers})
    .pipe(map(data=>data));    
  }

  getDatePerfilAdmin(admin : Administrador){
    return this.http.post(`${this.API_URI}/admin/returnDatosPerfil`,admin);
  }

  updateDateAdmin(admin : Administrador){
    return this.http.put(`${this.API_URI}/admin/updateDateAdmin`,admin);
  }

  saveCategoria(id_ad,nombre){
    return this.http.post(`${this.API_URI}/admin/categorias/crearCategoria`,
    {
      "id_ad":id_ad,
      "nombre":nombre
    });
  }

  getCategorias(){
    return this.http.get(`${this.API_URI}/admin/categorias/listCategorias`);
  }

  //METODOS CLIENTE
  saveCliente(cliente : Cliente){
    return this.http.post(`${this.API_URI}/usuario/registro`,cliente);
  }

  updateStateConfirmCliente(cliente : Cliente){
    return this.http.put(`${this.API_URI}/updateConfirmClient`,cliente);
  }

  getDatePerfil(cliente : Cliente){
    return this.http.post(`${this.API_URI}/usuario/returnDatosPerfil`,cliente);
  }
  
  updateDateCliente(cliente : Cliente){
    return this.http.put(`${this.API_URI}/usuario/updateDateCliente`,cliente);
  }

  updatePassCliente(cliente : Cliente){
    return this.http.put(`${this.API_URI}/usuario/updatePassCliente`,cliente);
  }

  getDateClienteRecPass(correo){
    return this.http.post(`${this.API_URI}/usuario/returnDatosRecuperarPass`,
    {
      "correo":correo
    });
  }

  loginUsuario(correo,pass){
    return this.http.post(`${this.API_URI}/login/ingresar`,
    {
      "correo":correo,
      "pass":pass
    },
    {headers:this.headers})
    .pipe(map(data=>data));    
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

  getProductosPrecioASC(){
    return this.http.get(`${this.API_URI}/usuario/listProductos/ordenASC`);
  }

  getProductosPrecioDESC(){
    return this.http.get(`${this.API_URI}/usuario/listProductos/ordenDESC`);
  }

  getProductoPorCategoria(nom_cat){
    return this.http.post(`${this.API_URI}/usuario/listProductos/porCategoria`,
    {
      "nom_cat":nom_cat
    });
  }

  getProductoPorPalabraClave(palab_clave){
    return this.http.post(`${this.API_URI}/usuario/listProductos/porPalabraClave`,
    {
      "palab_clave":palab_clave
    });
  }


  //REACCION

  reac_insertar(reaccion:Reaccion){
    return this.http.post(`${this.API_URI}/reaccion/insertar`,reaccion);
  }
  
  reac_cantidadMeGusta(id_producto){
    return this.http.post(`${this.API_URI}/reaccion/cantidadmegusta`,
    {
      "id_producto":id_producto
    });
  }

  reac_cantidadNoMeGusta(id_producto){
    return this.http.post(`${this.API_URI}/reaccion/cantidadnomegusta`,
    {
      "id_producto":id_producto
    });
  }

  reac_idUsuarioIdClienteExistenteEnMismaFila(id_c,id_producto){
    return this.http.post(`${this.API_URI}/reaccion/usuarioyaexiste`,
    {
      "id_c":id_c,
      "id_producto":id_producto
    });
  }

  reac_yaDioMeGusta(id_c,id_producto){
    return this.http.post(`${this.API_URI}/reaccion/usuarioyadiomegusta`,
    {
      "id_c":id_c,
      "id_producto":id_producto
    });
  }

  reac_yaDioNoMeGusta(id_c,id_producto){
    return this.http.post(`${this.API_URI}/reaccion/usuarioyadionomegusta`,
    {
      "id_c":id_c,
      "id_producto":id_producto
    });
  }

  reac_deMegustaAnomegusta(id_c,id_producto){
    return this.http.put(`${this.API_URI}/reaccion/megustaAnomegusta`,
    {
      "id_c":id_c,
      "id_producto":id_producto
    });
  }

  reac_deNoegustaAmegusta(id_c,id_producto){
    return this.http.put(`${this.API_URI}/reaccion/nomegustaAmegusta`,
    {
      "id_c":id_c,
      "id_producto":id_producto
    });
  }

  //CORREOS
  envCorreoConfirm(cliente : Cliente){
    return this.http.post(`${this.API_URI}/login/registro/envCorreoConfirm`,cliente);
  }

  envCorreoRecPass(correo){
    return this.http.post(`${this.API_URI}/login/envCorreoRecPass`,
    {
      "correo":correo
    });
  }

  //LOCALSTORAGE

  setAdminLS(admin:Administrador){
    let user:string = JSON.stringify(admin);
    localStorage.setItem('usuarioLogueado',user);
  }

  setClienteLS(cliente:Cliente){
    let user:string = JSON.stringify(cliente);
    localStorage.setItem('usuarioLogueado',user);
  }

  //GUARDA en localstorage (para cuando confirme cuenta)
  setClienteLSConfirm(cliente:Cliente){
    let user:string = JSON.stringify(cliente);
    localStorage.setItem('usuarioSinConfirm',user);
  }

  setClienteLSRecPass(cliente:Cliente){
    let user:string = JSON.stringify(cliente);
    localStorage.setItem('usuarioRecPass',user);
  }

  getAdminLS(){
    let user=localStorage.getItem('usuarioLogueado');
    if (!isNullOrUndefined(user)) {
      let user_json=JSON.parse(user);
      return user_json;
    }else{
      return null;
    }
  }

  getClienteLS(){
    let user=localStorage.getItem('usuarioLogueado');
    if (!isNullOrUndefined(user)) {
      let user_json=JSON.parse(user);
      return user_json;
    }else{
      return null;
    }
  }

  //RETORNA valores del cliente a confirmar
  getClienteLSConfirm(){
    let user=localStorage.getItem('usuarioSinConfirm');
    if (!isNullOrUndefined(user)) {
      let user_json=JSON.parse(user);
      return user_json;
    }else{
      return null;
    }
  }

  getClienteLSRecPass(){
    let user=localStorage.getItem('usuarioRecPass');
    if (!isNullOrUndefined(user)) {
      let user_json=JSON.parse(user);
      return user_json;
    }else{
      return null;
    }
  }

  //LOGOUT (elimina para cerrar sesion)
  logoutLS(){
    //borramos y direccionamos
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']); //si no esta logueado me redirije a login para que meta sus datos
  }

  //ELIMINARA, ya cuando alla confirmado
  deleteLSConfirm(){
    //borramos y direccionamos
    localStorage.removeItem('usuarioSinConfirm');
  }

  deleteLSRecPass(){
    //borramos y direccionamos
    localStorage.removeItem('usuarioRecPass');
  }

  //CARRITO LS
  addCarritoLS(carrito:Carrito){
    let carro;
    carro=this.getCarritoLS();
    carro.push(carrito);
    localStorage.setItem('carrito',JSON.stringify(carro));
  }

  getCarritoLS(){
    let carroLS;
    let carrito=localStorage.getItem('carrito');
    if(!isNullOrUndefined(carrito)){
      carroLS=JSON.parse(localStorage.getItem('carrito'));
    }else{
      carroLS=[];
    }
    return carroLS;
  }

}
