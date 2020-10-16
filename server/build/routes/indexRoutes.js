"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
//const oracledb = require('oracledb');
//credenciales de conexion de base de datos
//import  keys  from '../keys';
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/usuario/listProductos/:id', indexController_1.indexController.obtenerUsuario);
        this.router.get('/usuario/listProductos', indexController_1.indexController.obtenerTodosUsuarios);
        this.router.post('/', indexController_1.indexController.crearUsuario);
        this.router.put('/:id', indexController_1.indexController.actualizarUsuario);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
