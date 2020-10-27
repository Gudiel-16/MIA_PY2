import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerComentario{

    public async obtenerComentarios (req :Request,res: Response) {
        var autoCommit=false;
        const { id_producto } = req.body;
        let sql = "select CONCAT(CONCAT(cliente.nombre, ' '), cliente.apellido) \"nombre\", cliente.image, comentario.descripcion, comentario.fecha from comentario,cliente where cliente.id_c=comentario.id_c and comentario.id_producto=:id_producto order by comentario.id_com asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_producto], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async crearComentario(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { descripcion,fecha,id_producto,id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into comentario(descripcion,fecha,id_producto,id_c) values(:descripcion,:fecha,:id_producto,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[descripcion,fecha,id_producto,id_c],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Comentario Guardado"
        });
    }
}

export const indexControllerComentario= new IndexControllerComentario();