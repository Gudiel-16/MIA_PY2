import { Router } from 'express';

import {indexController} from '../controllers/indexController';
import {indexControllerCliente} from '../controllers/controllersCliente';
import {indexControllerCorreoConfirm} from '../controllers/controllersCorreoConfirm'
import {indexControllerAdmin} from '../controllers/controllersAdmin'
import {indexControllerCorreoRecupPass} from "../controllers/controllersCorreoRecupPass";
import {indexControllerCategoria} from '../controllers/controllersCategoria';
import {indexControllerReaccion} from '../controllers/controllersReaccion';
import {indexControllerCorreoVendedor} from '../controllers/controllersCorreoVendedor';
import {indexControllerCorreoComprador} from "../controllers/controllersCorreoComprador";
import {indexControllerDetalleCV} from '../controllers/controllersDetalleCV';
import {indexControllerComentario} from '../controllers/controllersComentario';
import {indexControllerDenuncia} from '../controllers/controllersDenuncia';
import {indexControllerBitacora} from '../controllers/controllersBitacora';
import {indexControllerReportes} from '../controllers/controllersReportes';
import {indexControllerChat} from '../controllers/controllersChat';
import {indexControllerMisProductos} from '../controllers/controllersMisProductos';
import {indexControllerCorreoBloqueo} from '../controllers/controllersCorreoBloqueo';

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
        this.router.post('/usuario/returnCorreo',indexControllerCliente.obtenerCorreo);
        this.router.put('/usuario/updateCreditos',indexControllerCliente.actualizarCreditosCliente);

        //PRODUCTO
        this.router.post('/usuario/listProductos',indexController.obtenerTodosProductos);
        this.router.post('/usuario/addProducto',indexController.crearProducto);
        this.router.get('/usuario/listProductos/detalleProducto/:id', indexController.obtenerUnProducto);
        this.router.post('/usuario/listProductos/ordenASC',indexController.obtenerProductosPrecioASC);
        this.router.post('/usuario/listProductos/ordenDESC',indexController.obtenerProductosPrecioDESC);
        this.router.post('/usuario/listProductos/porCategoria',indexController.obtenerProductosPorNomCategoria);
        this.router.post('/usuario/listProductos/porPalabraClave',indexController.obtenerProductosPorPalabraClave);
        this.router.put('/producto/deleteProducto',indexController.deleteProducto);
        this.router.put('/producto/updateProducto',indexController.actualizarDatosProducto);

        //MIS PRODUCTOS
        this.router.post('/usuario/misProductos',indexControllerMisProductos.obtenerTodosProductos);
        this.router.get('/usuario/listProductos/detalleMiProducto/:id', indexControllerMisProductos.obtenerUnProducto);
        this.router.post('/usuario/misProductos/ordenASC',indexControllerMisProductos.obtenerProductosPrecioASC);
        this.router.post('/usuario/misProductos/ordenDESC',indexControllerMisProductos.obtenerProductosPrecioDESC);
        this.router.post('/usuario/misProductos/porCategoria',indexControllerMisProductos.obtenerProductosPorNomCategoria);
        this.router.post('/usuario/misProductos/porPalabraClave',indexControllerMisProductos.obtenerProductosPorPalabraClave);

        //CATEGORIA
        this.router.post('/admin/categorias/crearCategoria',indexControllerCategoria.crearCategoria);
        this.router.get('/admin/categorias/listCategorias',indexControllerCategoria.obtenerCategorias);
        
        //REACCION
        this.router.post('/reaccion/insertar',indexControllerReaccion.insertar);
        this.router.post('/reaccion/cantidadmegusta',indexControllerReaccion.cantidadMegusta);
        this.router.post('/reaccion/cantidadnomegusta',indexControllerReaccion.cantidadNomegusta);
        this.router.post('/reaccion/usuarioyaexiste',indexControllerReaccion.siExiste_idUsarioIdProducto);
        this.router.post('/reaccion/usuarioyadiomegusta',indexControllerReaccion.siUsuarioYaDioMeGusta);
        this.router.post('/reaccion/usuarioyadionomegusta',indexControllerReaccion.siUsuarioYaDioNoMeGusta);
        this.router.put('/reaccion/megustaAnomegusta',indexControllerReaccion.deMegustaAnomegusta);
        this.router.put('/reaccion/nomegustaAmegusta',indexControllerReaccion.deNoMegustaAmegusta);

        //DETALLE CV
        this.router.post('/usuario/insertarDCV',indexControllerDetalleCV.crearDetalle);

        //COMENTARIO
        this.router.post('/producto/insertarComentario',indexControllerComentario.crearComentario);
        this.router.post('/producto/obtenerComentarios',indexControllerComentario.obtenerComentarios);

        //DENUNCIA
        this.router.post('/producto/insertarDenuncia',indexControllerDenuncia.crearDenuncia);
        this.router.get('/producto/obtenerDenuncias',indexControllerDenuncia.obtenerDenuncias);
        this.router.put('/producto/deleteProductoEnDenuncia',indexControllerDenuncia.deleteProductoEnDenuncia);
        this.router.get('/producto/obtenerProductosBloqueados',indexControllerDenuncia.productosBloqueados);

        //ENVIO DE CORREO
        this.router.post('/login/registro/envCorreoConfirm',indexControllerCorreoConfirm.enviarCorreoDeConfirmacion);
        this.router.post('/login/envCorreoRecPass',indexControllerCorreoRecupPass.enviarCorreoRecPass);
        this.router.post('/carrito/envCorreoAVendedor',indexControllerCorreoVendedor.enviarCorreoVendedor);
        this.router.post('/carrito/envCorreoAComprador',indexControllerCorreoComprador.enviarCorreoComprador);
        this.router.post('/bloqueo/envCorreDeBloqueo',indexControllerCorreoBloqueo.enviarCorreoBloqueo);

        //BITACORA
        this.router.post('/bitacora/insertar',indexControllerBitacora.insertar);

        //REPORTES
        this.router.get('/reporte/bitacoraASC',indexControllerReportes.bitacoraASC);
        this.router.get('/reporte/bitacoraDESC',indexControllerReportes.bitacoraDESC);
        this.router.get('/reporte/reporteProductosMasVendidos',indexControllerReportes.reporteProductosMasVendidos);
        this.router.get('/reporte/reporteProductosMasMegusta',indexControllerReportes.reporteProductosMasMegusta);
        this.router.get('/reporte/reporteProductosMasNoMegusta',indexControllerReportes.reporteProductosMasNoMegusta);
        this.router.get('/reporte/reporteClienteMasMenosCredito',indexControllerReportes.reporteClienteMasMenosCredito);
        this.router.get('/reporte/reporteClienteMasDenuncia',indexControllerReportes.reporteClienteMasDenuncia);
        this.router.get('/reporte/reporteClienteMasPublicaciones',indexControllerReportes.reporteClienteMasPublicaciones);
        this.router.get('/reporte/reportePaisesMasCreditoProducto',indexControllerReportes.reportePaisesMasCreditoProducto);
        
        
        //CHAT
        this.router.post('/chat/insertar',indexControllerChat.insertar);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
