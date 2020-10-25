"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const controllersCliente_1 = require("../controllers/controllersCliente");
const controllersCorreoConfirm_1 = require("../controllers/controllersCorreoConfirm");
const controllersAdmin_1 = require("../controllers/controllersAdmin");
const controllersCorreoRecupPass_1 = require("../controllers/controllersCorreoRecupPass");
const controllersCategoria_1 = require("../controllers/controllersCategoria");
const controllersReaccion_1 = require("../controllers/controllersReaccion");
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
        this.router.get('/usuario/listProductos/ordenASC', indexController_1.indexController.obtenerProductosPrecioASC);
        this.router.get('/usuario/listProductos/ordenDESC', indexController_1.indexController.obtenerProductosPrecioDESC);
        this.router.post('/usuario/listProductos/porCategoria', indexController_1.indexController.obtenerProductosPorNomCategoria);
        this.router.post('/usuario/listProductos/porPalabraClave', indexController_1.indexController.obtenerProductosPorPalabraClave);
        //CATEGORIA
        this.router.post('/admin/categorias/crearCategoria', controllersCategoria_1.indexControllerCategoria.crearCategoria);
        this.router.get('/admin/categorias/listCategorias', controllersCategoria_1.indexControllerCategoria.obtenerCategorias);
        //REACCION
        this.router.post('/reaccion/insertar', controllersReaccion_1.indexControllerReaccion.insertar);
        this.router.post('/reaccion/cantidadmegusta', controllersReaccion_1.indexControllerReaccion.cantidadMegusta);
        this.router.post('/reaccion/cantidadnomegusta', controllersReaccion_1.indexControllerReaccion.cantidadNomegusta);
        this.router.post('/reaccion/usuarioyaexiste', controllersReaccion_1.indexControllerReaccion.siExiste_idUsarioIdProducto);
        this.router.post('/reaccion/usuarioyadiomegusta', controllersReaccion_1.indexControllerReaccion.siUsuarioYaDioMeGusta);
        this.router.post('/reaccion/usuarioyadionomegusta', controllersReaccion_1.indexControllerReaccion.siUsuarioYaDioNoMeGusta);
        this.router.put('/reaccion/megustaAnomegusta', controllersReaccion_1.indexControllerReaccion.deMegustaAnomegusta);
        this.router.put('/reaccion/nomegustaAmegusta', controllersReaccion_1.indexControllerReaccion.deNoMegustaAmegusta);
        //ENVIO DE CORREO
        this.router.post('/login/registro/envCorreoConfirm', controllersCorreoConfirm_1.indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
        this.router.post('/login/envCorreoRecPass', controllersCorreoRecupPass_1.indexControllerCorreoRecupPass.enviarCorreoRecPass);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
