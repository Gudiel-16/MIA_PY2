import { Router } from 'express';

import {indexController} from '../controllers/indexController';
import {indexControllerCliente} from '../controllers/controllersCliente';

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        
        //CLIENTE
        this.router.post('/usuario/registro',indexControllerCliente.crearCliente);
        this.router.post('/login/ingresar',indexControllerCliente.buscarCliente);

        //PRODUCTO
        this.router.get('/usuario/listProductos',indexController.obtenerTodosProductos);

        this.router.post('/usuario/addProducto',indexController.crearProducto);

        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController.obtenerUnProducto);
        
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
