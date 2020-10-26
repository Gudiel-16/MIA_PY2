import { Router } from 'express';

import {indexController} from '../controllers/indexController';
import {indexControllerCliente} from '../controllers/controllersCliente';
import {indexControllerCorreoConfirm} from '../controllers/controllersCorreoConfirm'
import {indexControllerAdmin} from '../controllers/controllersAdmin'
import {indexControllerCorreoRecupPass} from "../controllers/controllersCorreoRecupPass";
import { indexControllerCategoria } from '../controllers/controllersCategoria';
import { indexControllerReaccion } from '../controllers/controllersReaccion';
import { indexControllerCorreoVendedor } from '../controllers/controllersCorreoVendedor';
import { indexControllerCorreoComprador } from "../controllers/controllersCorreoComprador";

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        
        //ADMINISTRADOR
        this.router.post('/login/ingresarAdmin',indexControllerAdmin.buscarAdmin);
        this.router.post('/admin/returnDatosPerfil',indexControllerAdmin.datosPerfilAdmin);
        this.router.put('/admin/updateDateAdmin',indexControllerAdmin.actualizarDatosAdmin);

        //CLIENTE
        this.router.post('/usuario/registro',indexControllerCliente.crearCliente);
        this.router.post('/login/ingresar',indexControllerCliente.buscarCliente);
        this.router.put('/updateConfirmClient',indexControllerCliente.actualizarEstadoConfirmacionCliente);
        this.router.post('/usuario/returnDatosPerfil',indexControllerCliente.datosPerfilCliente);
        this.router.put('/usuario/updateDateCliente',indexControllerCliente.actualizarDatosCliente);
        this.router.post('/usuario/returnDatosRecuperarPass',indexControllerCliente.datosClienteRecuperarPass);
        this.router.put('/usuario/updatePassCliente',indexControllerCliente.actualizarPassCliente);
        this.router.post('/usuario/returnCorreo',indexControllerCliente.obtenerCorreo);
        this.router.put('/usuario/updateCreditos',indexControllerCliente.actualizarCreditosCliente);

        //PRODUCTO
        this.router.get('/usuario/listProductos',indexController.obtenerTodosProductos);
        this.router.post('/usuario/addProducto',indexController.crearProducto);
        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController.obtenerUnProducto);
        this.router.get('/usuario/listProductos/ordenASC',indexController.obtenerProductosPrecioASC);
        this.router.get('/usuario/listProductos/ordenDESC',indexController.obtenerProductosPrecioDESC);
        this.router.post('/usuario/listProductos/porCategoria',indexController.obtenerProductosPorNomCategoria);
        this.router.post('/usuario/listProductos/porPalabraClave',indexController.obtenerProductosPorPalabraClave);

        //CATEGORIA
        this.router.post('/admin/categorias/crearCategoria',indexControllerCategoria.crearCategoria);
        this.router.get('/admin/categorias/listCategorias',indexControllerCategoria.obtenerCategorias);
        
        //REACCION
        this.router.post('/reaccion/insertar',indexControllerReaccion.insertar);
        this.router.post('/reaccion/cantidadmegusta',indexControllerReaccion.cantidadMegusta);
        this.router.post('/reaccion/cantidadnomegusta',indexControllerReaccion.cantidadNomegusta);
        this.router.post('/reaccion/usuarioyaexiste',indexControllerReaccion.siExiste_idUsarioIdProducto);
        this.router.post('/reaccion/usuarioyadiomegusta',indexControllerReaccion.siUsuarioYaDioMeGusta);
        this.router.post('/reaccion/usuarioyadionomegusta',indexControllerReaccion.siUsuarioYaDioNoMeGusta);
        this.router.put('/reaccion/megustaAnomegusta',indexControllerReaccion.deMegustaAnomegusta);
        this.router.put('/reaccion/nomegustaAmegusta',indexControllerReaccion.deNoMegustaAmegusta);

        //ENVIO DE CORREO
        this.router.post('/login/registro/envCorreoConfirm',indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
        this.router.post('/login/envCorreoRecPass',indexControllerCorreoRecupPass.enviarCorreoRecPass);
        this.router.post('/carrito/envCorreoAVendedor',indexControllerCorreoVendedor.enviarCorreoVendedor);
        this.router.post('/carrito/envCorreoAComprador',indexControllerCorreoComprador.enviarCorreoComprador);
        
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
