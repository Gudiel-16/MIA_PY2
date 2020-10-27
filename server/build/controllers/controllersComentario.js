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
exports.indexControllerComentario = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerComentario {
    obtenerComentarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_producto } = req.body;
            let sql = "select CONCAT(CONCAT(cliente.nombre, ' '), cliente.apellido) \"nombre\", cliente.image, comentario.descripcion, comentario.fecha from comentario,cliente where cliente.id_c=comentario.id_c and comentario.id_producto=:id_producto order by comentario.id_com asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    crearComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            const { descripcion, fecha, id_producto, id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)
            // los : son porque reciben parametros
            let sql = "insert into comentario(descripcion,fecha,id_producto,id_c) values(:descripcion,:fecha,:id_producto,:id_c)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [descripcion, fecha, id_producto, id_c], { autoCommit });
            cnn.release();
            //devuelvo el dato que se inserto
            res.status(200).json({
                "Respuesta": "Comentario Guardado"
            });
        });
    }
}
exports.indexControllerComentario = new IndexControllerComentario();
