"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const controllersCliente_1 = require("../controllers/controllersCliente");
const controllersCorreoConfirm_1 = require("../controllers/controllersCorreoConfirm");
const controllersAdmin_1 = require("../controllers/controllersAdmin");
const controllersCorreoRecupPass_1 = require("../controllers/controllersCorreoRecupPass");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //ADMINISTRADOR
        this.router.post('/login/ingresarAdmin', controllersAdmin_1.indexControllerAdmin.buscarAdmin);
        this.router.post('/admin/returnDatosPerfil', controllersAdmin_1.indexControllerAdmin.datosPerfilAdmin);
        this.router.put('/admin/updateDateAdmin', controllersAdmin_1.indexControllerAdmin.actualizarDatosAdmin);
        //CLIENTE
        this.router.post('/usuario/registro', controllersCliente_1.indexControllerCliente.crearCliente);
        this.router.post('/login/ingresar', controllersCliente_1.indexControllerCliente.buscarCliente);
        this.router.put('/updateConfirmClient', controllersCliente_1.indexControllerCliente.actualizarEstadoConfirmacionCliente);
        this.router.post('/usuario/returnDatosPerfil', controllersCliente_1.indexControllerCliente.datosPerfilCliente);
        this.router.put('/usuario/updateDateCliente', controllersCliente_1.indexControllerCliente.actualizarDatosCliente);
        this.router.post('/usuario/returnDatosRecuperarPass', controllersCliente_1.indexControllerCliente.datosClienteRecuperarPass);
        this.router.put('/usuario/updatePassCliente', controllersCliente_1.indexControllerCliente.actualizarPassCliente);
        //PRODUCTO
        this.router.get('/usuario/listProductos', indexController_1.indexController.obtenerTodosProductos);
        this.router.post('/usuario/addProducto', indexController_1.indexController.crearProducto);
        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController_1.indexController.obtenerUnProducto);
        //ENVIO DE CORREO
        this.router.post('/login/registro/envCorreoConfirm', controllersCorreoConfirm_1.indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
        this.router.post('/login/envCorreoRecPass', controllersCorreoRecupPass_1.indexControllerCorreoRecupPass.enviarCorreoRecPass);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
