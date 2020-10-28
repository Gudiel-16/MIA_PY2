"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexControllerDenuncia = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerDenuncia {
    obtenerDenuncias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            let sql = "select producto.nombre,producto.descripcion as \"DESCRIPRODUC\",producto.nom_cat,producto.precio,producto.ruta,denuncia.descripcion,denuncia.fecha,denuncia.id_producto from producto,denuncia where producto.id_producto=denuncia.id_producto and denuncia.estado_detele=1 order by denuncia.id_den asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    productosBloqueados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            let sql = "select producto.nombre,producto.descripcion as \"DESCRIPRODUC\",producto.nom_cat,producto.precio,producto.ruta,denuncia.descripcion,denuncia.fecha,denuncia.id_producto from producto,denuncia where producto.id_producto=denuncia.id_producto and denuncia.estado_detele=0 order by denuncia.id_den asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    crearDenuncia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            const { descripcion, fecha, id_producto, id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)
            // los : son porque reciben parametros
            let sql = "insert into denuncia(descripcion,fecha,id_producto,id_c) values(:descripcion,:fecha,:id_producto,:id_c)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [descripcion, fecha, id_producto, id_c], { autoCommit });
            cnn.release();
            //devuelvo el dato que se inserto
            res.status(200).json({
                "Respuesta": "Denuncia Guardado"
            });
        });
    }
    deleteProductoEnDenuncia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { id_producto } = req.body;
            let sql = "update denuncia set estado_detele=0 where id_producto=:id_producto";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto], { autoCommit });
            cnn.release();
            res.status(201).send({ msg: "Producto Eliminado" });
        });
    }
}
exports.indexControllerDenuncia = new IndexControllerDenuncia();
