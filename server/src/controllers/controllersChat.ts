import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerChat{

    public async insertar(data:any){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;

        let usersChat={
            name:'',
            image:'',
            text:'',
            fecha:'',
            id_producto:0,
            id_c:0
        }
        usersChat=data;
        const nombre=usersChat.name;
        const image=usersChat.image;
        const texto=usersChat.text;
        const fecha=usersChat.fecha;
        const id_producto=usersChat.id_producto;
        const id_c=usersChat.id_c;
        
        // los : son porque reciben parametros
        let sql = "insert into chat(nombre,image,texto,fecha,id_producto,id_c) values(:nombre,:image,:texto,:fecha,:id_producto,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[nombre,image,texto,fecha,id_producto,id_c],{autoCommit});
        cnn.release();
        
        return "Se guardo en Chat";
    }

}

export const indexControllerChat= new IndexControllerChat();