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
exports.indexControllerChat = void 0;
//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
const keys_1 = __importDefault(require("../keys"));
class IndexControllerChat {
    insertar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            let usersChat = {
                name: '',
                image: '',
                text: '',
                fecha: '',
                id_producto: 0,
                id_c: 0
            };
            usersChat = data;
            const nombre = usersChat.name;
            const image = usersChat.image;
            const texto = usersChat.text;
            const fecha = usersChat.fecha;
            const id_producto = usersChat.id_producto;
            const id_c = usersChat.id_c;
            // los : son porque reciben parametros
            let sql = "insert into chat(nombre,image,texto,fecha,id_producto,id_c) values(:nombre,:image,:texto,:fecha,:id_producto,:id_c)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [nombre, image, texto, fecha, id_producto, id_c], { autoCommit });
            cnn.release();
            return "Se guardo en Chat";
        });
    }
}
exports.indexControllerChat = new IndexControllerChat();
