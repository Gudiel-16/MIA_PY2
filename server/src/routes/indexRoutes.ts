import { Router } from 'express';

import {indexController} from '../controllers/indexController';
import {indexControllerCliente} from '../controllers/controllersCliente';
import {indexControllerCorreoConfirm} from '../controllers/controllersCorreoConfirm'
import {indexControllerAdmin} from '../controllers/controllersAdmin'
import {indexControllerCorreoRecupPass} from "../controllers/controllersCorreoRecupPass";

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

        //PRODUCTO
        this.router.get('/usuario/listProductos',indexController.obtenerTodosProductos);

        this.router.post('/usuario/addProducto',indexController.crearProducto);

        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController.obtenerUnProducto);
        
        //ENVIO DE CORREO
        this.router.post('/login/registro/envCorreoConfirm',indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
        this.router.post('/login/envCorreoRecPass',indexControllerCorreoRecupPass.enviarCorreoRecPass);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
