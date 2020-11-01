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
exports.indexController = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexController {
    obtenerUnProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text:'Usuario con ID' + req.params.id});
            const idProd = req.params.id;
            var autoCommit = false;
            let sql = "select * from producto where id_producto=" + idProd;
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [], { autoCommit });
            cnn.release();
            //console.log(result)
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    dataproduct: {
                        "id_producto": result.rows[0][0],
                        "nombre": result.rows[0][1],
                        "descripcion": result.rows[0][2],
                        "palab_clave": result.rows[0][3],
                        "precio": result.rows[0][4],
                        "ruta": result.rows[0][5],
                        "nom_cat": result.rows[0][6],
                        "id_c": result.rows[0][7]
                    }
                });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    obtenerTodosProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c } = req.body;
            let sql = "select * from producto where estado_detele=1 and id_c != :id_c";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    crearProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            const { id_producto, nombre, descripcion, palab_clave, ruta, precio, nom_cat, id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)
            // los : son porque reciben parametros
            let sql = "insert into producto(nombre,descripcion,palab_clave,precio,ruta,nom_cat,id_c) values (:nombre,:descripcion,:palab_clave,:precio,:ruta,:nom_cat,:id_c)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [nombre, descripcion, palab_clave, precio, ruta, nom_cat, id_c], { autoCommit });
            cnn.release();
            //devuelvo el dato que se inserto
            res.status(200).json({
                "Respuesta": "Producto Guardado"
            });
        });
    }
    obtenerProductosPrecioASC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c } = req.body;
            let sql = "select * from producto where id_c != :id_c order by precio asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    obtenerProductosPrecioDESC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c } = req.body;
            let sql = "select * from producto where id_c != :id_c order by precio desc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    obtenerProductosPorNomCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { nom_cat, id_c } = req.body;
            let sql = "select * from producto where id_c != :id_c and nom_cat=:nom_cat";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c, nom_cat], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    obtenerProductosPorPalabraClave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { palab_clave, id_c } = req.body;
            let sql = "select id_producto,nombre,descripcion, palab_clave,precio,ruta,nom_cat,id_c, instr(palab_clave,:palab_clave,1,1) from producto where instr(palab_clave,:palab_clave,1,1)=1 and id_c != :id_c";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [palab_clave, palab_clave, id_c], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { id_producto } = req.body;
            let sql = "update producto set estado_detele=0 where id_producto=:id_producto";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto], { autoCommit });
            cnn.release();
            res.status(201).send({ msg: "Producto Eliminado" });
        });
    }
    actualizarDatosProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { nombre, descripcion, palab_clave, precio, ruta, nom_cat, id_producto } = req.body; //req.body, recibe un cuerpo de msj (un json)
            let sql = "update producto set nombre=:nombre, descripcion=:descripcion, palab_clave=:palab_clave, precio=:precio, ruta=:ruta, nom_cat=:nom_cat where id_producto=:id_producto";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [nombre, descripcion, palab_clave, precio, ruta, nom_cat, id_producto], { autoCommit });
            cnn.release();
            res.status(201).send({ msg: "Producto Actualizado" });
        });
    }
}
exports.indexController = new IndexController();
