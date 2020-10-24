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
exports.indexControllerAdmin = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerAdmin {
    buscarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { correo, pass } = req.body;
            let sql = "select id_ad, nombre, apellido, correo, pais, fech_nac, pass, image from administrador where correo=:correo and pass=:pass";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [correo, pass], { autoCommit });
            cnn.release();
            //si existe
            if (result.rows.length > 0) {
                res.status(201).json({
                    msg: true,
                    datauser: {
                        "id_ad": result.rows[0][0],
                        "nombre": result.rows[0][1],
                        "apellido": result.rows[0][2],
                        "correo": result.rows[0][3],
                        "pais": result.rows[0][4],
                        "fech_nac": result.rows[0][5],
                        "pass": result.rows[0][6],
                        "image": result.rows[0][7]
                    }
                });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
    datosPerfilAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_ad } = req.body;
            console.log(req.body);
            let sql = "select id_ad, nombre, apellido, correo, pais, fech_nac, pass, image from administrador where id_ad=:id_ad";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_ad], { autoCommit });
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
                        "image": result.rows[0][7]
                    }
                });
            }
            else {
                res.status(201).json({ msg: false });
            }
        });
    }
}
exports.indexControllerAdmin = new IndexControllerAdmin();
