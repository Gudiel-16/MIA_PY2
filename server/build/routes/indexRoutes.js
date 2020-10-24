"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const controllersCliente_1 = require("../controllers/controllersCliente");
const controllersCorreoConfirm_1 = require("../controllers/controllersCorreoConfirm");
const controllersAdmin_1 = require("../controllers/controllersAdmin");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //ADMINISTRADOR
        this.router.post('/login/ingresarAdmin', controllersAdmin_1.indexControllerAdmin.buscarAdmin);
        this.router.post('/admin/returnDatosPerfil', controllersAdmin_1.indexControllerAdmin.datosPerfilAdmin);
        //CLIENTE
        this.router.post('/usuario/registro', controllersCliente_1.indexControllerCliente.crearCliente);
        this.router.post('/login/ingresar', controllersCliente_1.indexControllerCliente.buscarCliente);
        this.router.put('/updateConfirmClient', controllersCliente_1.indexControllerCliente.actualizarEstadoConfirmacionCliente);
        this.router.post('/usuario/returnDatosPerfil', controllersCliente_1.indexControllerCliente.datosPerfilCliente);
        this.router.put('/usuario/updateDateCliente', controllersCliente_1.indexControllerCliente.actualizarDatosCliente);
        //PRODUCTO
        this.router.get('/usuario/listProductos', indexController_1.indexController.obtenerTodosProductos);
        this.router.post('/usuario/addProducto', indexController_1.indexController.crearProducto);
        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController_1.indexController.obtenerUnProducto);
        //ENVIO DE CORREO DE CONFIRMACION
        this.router.post('/login/registro/envCorreoConfirm', controllersCorreoConfirm_1.indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
