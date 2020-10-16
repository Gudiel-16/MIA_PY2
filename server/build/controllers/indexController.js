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
    obtenerUsuario(req, res) {
        //res.json({text:'Usuario con ID' + req.params.id});
    }
    obtenerTodosUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "select * from producto where codigo=1";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [], { true: Boolean });
            cnn.release();
            res.status(200).json(result);
        });
    }
    crearUsuario(req, res) {
        res.json({ text: 'Creando usuario...' });
    }
    actualizarUsuario(req, res) {
        res.json({ text: 'Acutalizando usuario...' + req.params.id });
    }
}
exports.indexController = new IndexController();
