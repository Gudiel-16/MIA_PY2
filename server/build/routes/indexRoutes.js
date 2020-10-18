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
        this.router.get('/usuario/listProductos', indexController_1.indexController.obtenerTodosUsuarios);
        this.router.post('/usuario/addProducto', indexController_1.indexController.crearProducto);
        this.router.get('/usuario/listProductos/:id', indexController_1.indexController.obtenerUsuario);
        this.router.put('/:id', indexController_1.indexController.actualizarUsuario);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
