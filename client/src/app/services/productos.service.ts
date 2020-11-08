import { Injectable } from '@angular/core';

//para poder pedir datos (httpClient me va permitir poder hacer peticiones)
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importamos para tener acceso a las rutas
import { Router } from '@angular/router';

//socket
import * as io from 'socket.io-client';

//importamos interfaz
import { Producto } from '../models/listProductos'
import { Cliente } from '../models/registroCliente'
import { Reaccion } from '../models/reaccion_Interface';
import { Carrito } from '../models/carrito_Interface';
import { Comentario } from '../models/comentario_Interface';
import { Denuncia } from '../models/denuncia_Inteface';
import { Administrador } from '../models/admin_Interface';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators'
import { pipe,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  socket:any;

  //guardamos direccion
  API_URI='https://491784401f29.ngrok.io'

  //creamos variable privada http
  constructor(private http:HttpClient, private router:Router) { 
    //para poner emitir nuestros eventos
    this.socket=io(this.API_URI);
  }

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

  getCorreoCliente(id_c){
    return this.http.post(`${this.API_URI}/usuario/returnCorreo`,
    {
      "id_c":id_c
    });    
  }

  updateCreditosCliente(creditos,id_c){
    return this.http.put(`${this.API_URI}/usuario/updateCreditos`,
    {
      "creditos":creditos,
      "id_c":id_c
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

  //DETALLE CV
  saveDetalle(detalle){
    return this.http.post(`${this.API_URI}/usuario/insertarDCV`,detalle);
  }

  //COMENTARIO
  getComentarios(id_producto){
    return this.http.post(`${this.API_URI}/producto/obtenerComentarios`,
    {
      "id_producto":id_producto
    });
  }

  saveComentario(comentario: Comentario){
    return this.http.post(`${this.API_URI}/producto/insertarComentario`,comentario);
  }

  //DENUNCIA
  getDenuncias(){
    return this.http.get(`${this.API_URI}/producto/obtenerDenuncias`);
  }

  saveDenuncia(denuncia: Denuncia){
    return this.http.post(`${this.API_URI}/producto/insertarDenuncia`,denuncia);
  }

  deleteProductoEnDenuncia(id_producto){
    return this.http.put(`${this.API_URI}/producto/deleteProductoEnDenuncia`,
    {
      "id_producto":id_producto
    });
  }

  getProductosBloqueados(){
    return this.http.get(`${this.API_URI}/producto/obtenerProductosBloqueados`);
  }

  //METODOS PRODUCTO
  getProductos(id_c){
    return this.http.post(`${this.API_URI}/usuario/listProductos`,
    {
      "id_c":id_c
    });
  }

  getMisProductos(id_c){
    return this.http.post(`${this.API_URI}/usuario/misProductos`,
    {
      "id_c":id_c
    });
  }

  getProducto(id:string){
    return this.http.get(`${this.API_URI}/usuario/listProductos/detalleProducto/${id}`);
  }

  saveProducto(producto: Producto){
    return this.http.post(`${this.API_URI}/usuario/addProducto`,producto);
  }

  getProductosPrecioASC(id_c){
    return this.http.post(`${this.API_URI}/usuario/listProductos/ordenASC`,
    {
      "id_c":id_c
    });
  }

  getProductosPrecioDESC(id_c){
    return this.http.post(`${this.API_URI}/usuario/listProductos/ordenDESC`,
    {
      "id_c":id_c
    });
  }

  getProductoPorCategoria(nom_cat,id_c){
    return this.http.post(`${this.API_URI}/usuario/listProductos/porCategoria`,
    {
      "nom_cat":nom_cat,
      "id_c":id_c
    });
  }

  getProductoPorPalabraClave(palab_clave,id_c){
    return this.http.post(`${this.API_URI}/usuario/listProductos/porPalabraClave`,
    {
      "palab_clave":palab_clave,
      "id_c":id_c
    });
  }

  getMiProductosPrecioASC(id_c){
    return this.http.post(`${this.API_URI}/usuario/misProductos/ordenASC`,
    {
      "id_c":id_c
    });
  }

  getMiProductosPrecioDESC(id_c){
    return this.http.post(`${this.API_URI}/usuario/misProductos/ordenDESC`,
    {
      "id_c":id_c
    });
  }

  getMiProductoPorCategoria(nom_cat,id_c){
    return this.http.post(`${this.API_URI}/usuario/misProductos/porCategoria`,
    {
      "nom_cat":nom_cat,
      "id_c":id_c
    });
  }

  getMiProductoPorPalabraClave(palab_clave,id_c){
    return this.http.post(`${this.API_URI}/usuario/misProductos/porPalabraClave`,
    {
      "palab_clave":palab_clave,
      "id_c":id_c
    });
  }

  deleteProducto(id_producto){
    return this.http.put(`${this.API_URI}/producto/deleteProducto`,
    {
      "id_producto":id_producto
    });
  }

  updateProducto(producto : Producto){
    return this.http.put(`${this.API_URI}/producto/updateProducto`,producto);
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

  envCorreoAVendedor(fecha,correo,nombre,filas,total,creditos,id_c){
    return this.http.post(`${this.API_URI}/carrito/envCorreoAVendedor`,
    {
      "fecha":fecha,
      "correo":correo,
      "nombre":nombre,
      "filas":filas,
      "total":total,
      "creditos":creditos,
      "id_c":id_c
    });
  }

  envCorreoAComprador(fecha,correo,nombre,filas,total){
    return this.http.post(`${this.API_URI}/carrito/envCorreoAComprador`,
    {
      "fecha":fecha,
      "correo":correo,
      "nombre":nombre,
      "filas":filas,
      "total":total
    });
  }

  envCorreoBloqueo(fecha,correo,nombreClient,nombreProduct,precio,image){
    return this.http.post(`${this.API_URI}/bloqueo/envCorreDeBloqueo`,
    {
      "fecha":fecha,
      "correo":correo,
      "nombreClient":nombreClient,
      "nombreProduct":nombreProduct,
      "precio":precio,
      "image":image
    });
  }

  //BITACORA
  saveBitacora(correo,descripcin,fecha){
    return this.http.post(`${this.API_URI}/bitacora/insertar`,
    {
      "correo":correo,
      "descripcion":descripcin,
      "fecha":fecha
    });
  }

  //REPORTES
  getBitacoraASC(){
    return this.http.get(`${this.API_URI}/reporte/bitacoraASC`);
  }

  getBitacoraDESC(){
    return this.http.get(`${this.API_URI}/reporte/bitacoraDESC`);
  }

  getProductosMasVendidos(){
    return this.http.get(`${this.API_URI}/reporte/reporteProductosMasVendidos`);
  }

  getreporteProductosMasMegusta(){
    return this.http.get(`${this.API_URI}/reporte/reporteProductosMasMegusta`);
  }

  getreporteProductosMasNoMegusta(){
    return this.http.get(`${this.API_URI}/reporte/reporteProductosMasNoMegusta`);
  }

  getreporteClienteMasMenosCredito(){
    return this.http.get(`${this.API_URI}/reporte/reporteClienteMasMenosCredito`);
  }

  getreporteClienteMasDenuncia(){
    return this.http.get(`${this.API_URI}/reporte/reporteClienteMasDenuncia`);
  }

  getreporteClienteMasPublicaciones(){
    return this.http.get(`${this.API_URI}/reporte/reporteClienteMasPublicaciones`);
  }

  getreportePaisesMasCreditoProducto(){
    return this.http.get(`${this.API_URI}/reporte/reportePaisesMasCreditoProducto`);
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

  deleteCarritoLS(){
    localStorage.removeItem('carrito');
  }

  //SOCKET
  listen(eventName:string){
    return new Observable((Suscribir)=>{
      this.socket.on(eventName,(data)=>{
        Suscribir.next(data);
      });
    });
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName,data);
  }

}
