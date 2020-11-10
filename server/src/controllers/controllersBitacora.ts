import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerBitacora{

    public async insertar(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { correo, descripcion, fecha} = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into bitacora(correo,descripcion,fecha) values(:correo,:descripcion,:fecha)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[correo, descripcion, fecha],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Se Guardo en Bitacora"
        });
    }

    public async pruebaNGROK(req :Request,res: Response){
        
        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "TODO FUNCIONANDO!"
        });
    }



}

export const indexControllerBitacora= new IndexControllerBitacora();