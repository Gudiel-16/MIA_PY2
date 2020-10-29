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
const controllersCorreoVendedor_1 = require("../controllers/controllersCorreoVendedor");
const controllersCorreoComprador_1 = require("../controllers/controllersCorreoComprador");
const controllersDetalleCV_1 = require("../controllers/controllersDetalleCV");
const controllersComentario_1 = require("../controllers/controllersComentario");
const controllersDenuncia_1 = require("../controllers/controllersDenuncia");
const controllersBitacora_1 = require("../controllers/controllersBitacora");
const controllersReportes_1 = require("../controllers/controllersReportes");
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
        this.router.post('/usuario/returnCorreo', controllersCliente_1.indexControllerCliente.obtenerCorreo);
        this.router.put('/usuario/updateCreditos', controllersCliente_1.indexControllerCliente.actualizarCreditosCliente);
        //PRODUCTO
        this.router.get('/usuario/listProductos', indexController_1.indexController.obtenerTodosProductos);
        this.router.post('/usuario/addProducto', indexController_1.indexController.crearProducto);
        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController_1.indexController.obtenerUnProducto);
        this.router.get('/usuario/listProductos/ordenASC', indexController_1.indexController.obtenerProductosPrecioASC);
        this.router.get('/usuario/listProductos/ordenDESC', indexController_1.indexController.obtenerProductosPrecioDESC);
        this.router.post('/usuario/listProductos/porCategoria', indexController_1.indexController.obtenerProductosPorNomCategoria);
        this.router.post('/usuario/listProductos/porPalabraClave', indexController_1.indexController.obtenerProductosPorPalabraClave);
        this.router.put('/producto/deleteProducto', indexController_1.indexController.deleteProducto);
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
        //DETALLE CV
        this.router.post('/usuario/insertarDCV', controllersDetalleCV_1.indexControllerDetalleCV.crearDetalle);
        //COMENTARIO
        this.router.post('/producto/insertarComentario', controllersComentario_1.indexControllerComentario.crearComentario);
        this.router.post('/producto/obtenerComentarios', controllersComentario_1.indexControllerComentario.obtenerComentarios);
        //DENUNCIA
        this.router.post('/producto/insertarDenuncia', controllersDenuncia_1.indexControllerDenuncia.crearDenuncia);
        this.router.get('/producto/obtenerDenuncias', controllersDenuncia_1.indexControllerDenuncia.obtenerDenuncias);
        this.router.put('/producto/deleteProductoEnDenuncia', controllersDenuncia_1.indexControllerDenuncia.deleteProductoEnDenuncia);
        this.router.get('/producto/obtenerProductosBloqueados', controllersDenuncia_1.indexControllerDenuncia.productosBloqueados);
        //ENVIO DE CORREO
        this.router.post('/login/registro/envCorreoConfirm', controllersCorreoConfirm_1.indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
        this.router.post('/login/envCorreoRecPass', controllersCorreoRecupPass_1.indexControllerCorreoRecupPass.enviarCorreoRecPass);
        this.router.post('/carrito/envCorreoAVendedor', controllersCorreoVendedor_1.indexControllerCorreoVendedor.enviarCorreoVendedor);
        this.router.post('/carrito/envCorreoAComprador', controllersCorreoComprador_1.indexControllerCorreoComprador.enviarCorreoComprador);
        //BITACORA
        this.router.post('/bitacora/insertar', controllersBitacora_1.indexControllerBitacora.insertar);
        //REPORTES
        this.router.get('/reporte/bitacoraASC', controllersReportes_1.indexControllerReportes.bitacoraASC);
        this.router.get('/reporte/bitacoraDESC', controllersReportes_1.indexControllerReportes.bitacoraDESC);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
