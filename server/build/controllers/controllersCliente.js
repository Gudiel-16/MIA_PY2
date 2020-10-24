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
exports.indexControllerCliente = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerCliente {
    crearCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            const { id_c, nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion } = req.body; //req.body, recibe un cuerpo de msj (un json)
            // los : son porque reciben parametros
            let sql = "insert into cliente(nombre,apellido,correo,pais,fech_nac,pass,image,creditos,confirmacion) values (:nombre,:apellido,:correo,:pais,:fech_nac,:pass,:image,:creditos,:confirmacion)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion], { autoCommit });
            cnn.release();
            //devuelvo el dato que se inserto
            res.status(200).json({
                "Respuesta": "Cliente Guardado"
            });
        });
    }
    buscarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { correo, pass } = req.body;
            let sql = "select id_c, nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion from cliente where correo=:correo and pass=:pass and confirmacion=1";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [correo, pass], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    msg: true,
                    datauser: {
                        "id_c": result.rows[0][0],
                        "nombre": result.rows[0][1],
                        "apellido": result.rows[0][2],
                        "correo": result.rows[0][3],
                        "pais": result.rows[0][4],
                        "fech_nac": result.rows[0][5],
                        "pass": result.rows[0][6],
                        "image": result.rows[0][7],
                        "creditos": result.rows[0][8]
                    }
                });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    actualizarEstadoConfirmacionCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { correo, pass } = req.body;
            let sql = "update cliente set confirmacion=1 where correo=:correo and pass=:pass";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [correo, pass], { autoCommit });
            cnn.release();
            res.status(201).send({ msg: "Usuario Actualizado" });
        });
    }
    datosPerfilCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_c } = req.body;
            console.log(req.body);
            let sql = "select id_c, nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion from cliente where id_c=:id_c";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_c], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    datauser: {
                        "id_c": result.rows[0][0],
                        "nombre": result.rows[0][1],
                        "apellido": result.rows[0][2],
                        "correo": result.rows[0][3],
                        "pais": result.rows[0][4],
                        "fech_nac": result.rows[0][5],
                        "pass": result.rows[0][6],
                        "image": result.rows[0][7],
                        "creditos": result.rows[0][8]
                    }
                });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    actualizarDatosCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { id_c, nombre, apellido, pais, fech_nac, pass, image } = req.body; //req.body, recibe un cuerpo de msj (un json)
            let sql = "update cliente set nombre=:nombre, apellido=:apellido, pais=:pais, fech_nac=:fech_nac, pass=:pass, image=:image where id_c=:id_c";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [nombre, apellido, pais, fech_nac, pass, image, id_c], { autoCommit });
            cnn.release();
            res.status(201).send({ msg: "Datos Usuario Actualizado" });
        });
    }
    datosClienteRecuperarPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { correo } = req.body;
            console.log(req.body);
            let sql = "select id_c, nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion from cliente where correo=:correo";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [correo], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    datauser: {
                        "id_c": result.rows[0][0],
                        "nombre": result.rows[0][1],
                        "apellido": result.rows[0][2],
                        "correo": result.rows[0][3],
                        "pais": result.rows[0][4],
                        "fech_nac": result.rows[0][5],
                        "pass": result.rows[0][6],
                        "image": result.rows[0][7],
                        "creditos": result.rows[0][8]
                    }
                });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    actualizarPassCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = true;
            const { id_c, pass } = req.body; //req.body, recibe un cuerpo de msj (un json)
            let sql = "update cliente set pass=:pass where id_c=:id_c";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [pass, id_c], { autoCommit });
            cnn.release();
            res.status(201).send({ msg: "Password Usuario Actualizado" });
        });
    }
}
exports.indexControllerCliente = new IndexControllerCliente();
