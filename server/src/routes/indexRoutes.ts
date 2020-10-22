import { Router } from 'express';

import {indexController} from '../controllers/indexController';
import {indexControllerCliente} from '../controllers/controllersCliente';
import {indexControllerCorreoConfirm} from '../controllers/controllersCorreoConfirm'

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        
        //CLIENTE
        this.router.post('/usuario/registro',indexControllerCliente.crearCliente);
        this.router.post('/login/ingresar',indexControllerCliente.buscarCliente);
        this.router.put('/updateConfirmClient',indexControllerCliente.actualizarEstadoConfirmacionCliente);

        //PRODUCTO
        this.router.get('/usuario/listProductos',indexController.obtenerTodosProductos);

        this.router.post('/usuario/addProducto',indexController.crearProducto);

        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController.obtenerUnProducto);
        
        //ENVIO DE CORREO DE CONFIRMACION
        this.router.post('/login/registro/envCorreoConfirm',indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
