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
exports.indexControllerReportes = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerReportes {
    bitacoraASC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            let sql = "select * from bitacora order by id_bit asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
        });
    }
    bitacoraDESC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            let sql = "select * from bitacora order by id_bit desc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
        });
    }
}
exports.indexControllerReportes = new IndexControllerReportes();
