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
exports.indexControllerReaccion = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerReaccion {
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            const { megusta, nomegusta, id_producto, id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)
            // los : son porque reciben parametros
            let sql = "insert into reaccion(megusta,nomegusta,id_producto,id_c) values(:megusta,:nomegusta,:id_producto,:id_c)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [megusta, nomegusta, id_producto, id_c], { autoCommit });
            cnn.release();
            //devuelvo el dato que se inserto
            res.status(200).json({
                "Respuesta": "Reaccion Guardada"
            });
        });
    }
    cantidadMegusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_producto } = req.body;
            let sql = "select count(megusta) as \"megusta\" from reaccion where id_producto=:id_producto and megusta=1";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    data: {
                        "megusta": result.rows[0][0]
                    }
                });
            }
            else {
                res.status(201).json({
                    data: {
                        "megusta": 0
                    }
                });
            }
        });
    }
    cantidadNomegusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_producto } = req.body;
            let sql = "select count(nomegusta) as \"nomegusta\" from reaccion where id_producto=:id_producto and nomegusta=1";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    data: {
                        "nomegusta": result.rows[0][0]
                    }
                });
            }
            else {
                res.status(201).json({
                    data: {
                        "nomegusta": 0
                    }
                });
            }
        });
    }
    siExiste_idUsarioIdProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c, id_producto } = req.body;
            let sql = "select * from reaccion where id_c=:id_c and id_producto =:id_producto";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c, id_producto], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({ msg: true });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    siUsuarioYaDioMeGusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c, id_producto } = req.body;
            let sql = "select * from reaccion where id_c=:id_c and id_producto=:id_producto and megusta=1";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c, id_producto], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({ msg: true });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    siUsuarioYaDioNoMeGusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c, id_producto } = req.body;
            let sql = "select * from reaccion where id_c=:id_c and id_producto=:id_producto and nomegusta=1";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c, id_producto], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({ msg: true });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    deMegustaAnomegusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { id_c, id_producto } = req.body;
            let sql = "update reaccion set megusta=0, nomegusta=1 where id_c=:id_c and id_producto=:id_producto";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c, id_producto], { autoCommit });
            cnn.release();
            //si existe
            res.status(201).send({ msg: "De megusta a nomegusta Actualizado" });
        });
    }
    deNoMegustaAmegusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { id_c, id_producto } = req.body;
            let sql = "update reaccion set megusta=1, nomegusta=0 where id_c=:id_c and id_producto=:id_producto";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c, id_producto], { autoCommit });
            cnn.release();
            //si existe
            res.status(201).send({ msg: "De nomegusta a megusta Actualizado" });
        });
    }
}
exports.indexControllerReaccion = new IndexControllerReaccion();
