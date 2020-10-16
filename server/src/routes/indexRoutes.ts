import { Router } from 'express';

import {indexController} from '../controllers/indexController';

//const oracledb = require('oracledb');
//credenciales de conexion de base de datos
//import  keys  from '../keys';

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //ruta inicial
        this.router.get('/usuario/listProductos/:id', indexController.obtenerUsuario);

        this.router.get('/usuario/listProductos',indexController.obtenerTodosUsuarios);

        this.router.post('/',indexController.crearUsuario);
        
        this.router.put('/:id',indexController.actualizarUsuario)
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
