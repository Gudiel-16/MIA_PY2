import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerDetalleCV{

    public async crearDetalle(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const {cantidad, precio, subtotal,id_producto,id_c} = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into detalle_cv(cantidad,precio,subtotal,id_producto,id_c) values (:cantidad,:precio,:subtotal,:id_producto,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[cantidad, precio, subtotal,id_producto,id_c],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Detalle Compra-Vetna Guardado"
        });
    }

}

export const indexControllerDetalleCV= new IndexControllerDetalleCV();