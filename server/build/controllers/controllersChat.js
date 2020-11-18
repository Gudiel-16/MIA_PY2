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
    /*public async insertar(data:any){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;

        let usersChat={
            name:'',
            image:'',
            text:'',
            fecha:'',
            id_producto:0,
            id_c_Aenviar:0,
            id_c:0,
            bandera:0
        }
        usersChat=data;
        const nombre=usersChat.name;
        const image=usersChat.image;
        const texto=usersChat.text;
        const fecha=usersChat.fecha;
        const id_producto=usersChat.id_producto;
        const id_c_Aenviar=usersChat.id_c_Aenviar;
        const id_c=usersChat.id_c;
        
        // los : son porque reciben parametros
        let sql = "insert into chat(nombre,image,texto,fecha,id_producto,id_c_Aenviar,id_c) values(:nombre,:image,:texto,:fecha,:id_producto,:id_c_Aenviar,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[nombre,image,texto,fecha,id_producto,id_c_Aenviar,id_c],{autoCommit});
        cnn.release();
        console.log(data);
        return "Se guardo en Chat";
    }*/
    datosParaCliente(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            let usersChat = {
                name: '',
                image: '',
                text: '',
                fecha: '',
                id_producto: 0,
                id_c_Aenviar: 0,
                id_c: 0,
                bandera: 0
            };
            usersChat = data;
            const id_producto = usersChat.id_producto;
            const id_c_Aenviar = usersChat.id_c_Aenviar;
            const id_c = usersChat.id_c;
            let sql = "select * from chat where id_producto=:id_producto and ((id_c_aenviar=:id_c_aenviar and id_c=:id_c) or (id_c_aenviar=:id_c and id_c=:id_c_aenviar)) order by id_chat asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto, id_c_Aenviar, id_c], { autoCommit });
            cnn.release();
            //console.log(result)
            return result.rows;
        });
    }
    datosParaVendedor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            let usersChat = {
                name: '',
                image: '',
                text: '',
                fecha: '',
                id_producto: 0,
                id_c_Aenviar: 0,
                id_c: 0,
                bandera: 0
            };
            usersChat = data;
            const id_producto = usersChat.id_producto;
            let sql = "select * from chat where id_producto=:id_producto order by id_chat asc";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto], { autoCommit });
            cnn.release();
            //console.log(result)
            return result.rows;
        });
    }
    insertar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
            var autoCommit = true;
            let usersChat = {
                name: '',
                image: '',
                message: '',
                fecha: '',
                id_producto: 0,
                id_c_Aenviar: 0,
                id_c: 0,
                bandera: 0,
                room: ''
            };
            usersChat = data;
            const nombre = usersChat.name;
            const image = usersChat.image;
            const message = usersChat.message;
            const fecha = usersChat.fecha;
            const id_producto = usersChat.id_producto;
            const id_c_Aenviar = usersChat.id_c_Aenviar;
            const id_c = usersChat.id_c;
            const room = usersChat.room;
            // los : son porque reciben parametros
            let sql = "insert into chat(nombre,image,message,fecha,id_producto,id_c_Aenviar,id_c,room) values(:nombre,:image,:message,:fecha,:id_producto,:id_c_Aenviar,:id_c,:room)";
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            yield cnn.execute(sql, [nombre, image, message, fecha, id_producto, id_c_Aenviar, id_c, room], { autoCommit });
            cnn.release();
            //console.log(data);
            return "Se guardo en Chat";
        });
    }
    listaChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { id_producto, id_c } = req.body;
            let sql = 'select room,nombre,id_c\
                    from chat where id_producto=:id_producto and id_c!=:id_c\
                    group by room,nombre,id_c';
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [id_producto, id_c], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    conversacionChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const { room } = req.body;
            let sql = 'select * from chat where room=:room order by id_chat asc';
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [room], { autoCommit });
            cnn.release();
            //console.log(result)
            res.status(200).json(result.rows);
        });
    }
    conversacionChatServer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var autoCommit = false;
            const room = data.room;
            let sql = 'select * from chat where room=:room order by id_chat asc';
            let cnn = yield oracledb.getConnection(keys_1.default.cns);
            let result = yield cnn.execute(sql, [room], { autoCommit });
            cnn.release();
            //console.log(result)
            return result.rows;
        });
    }
}
exports.indexControllerChat = new IndexControllerChat();
