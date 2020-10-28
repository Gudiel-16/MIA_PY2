import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerDenuncia{

    public async obtenerDenuncias (req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select producto.nombre,producto.descripcion as \"DESCRIPRODUC\",producto.nom_cat,producto.precio,producto.ruta,denuncia.descripcion,denuncia.fecha,denuncia.id_producto from producto,denuncia where producto.id_producto=denuncia.id_producto and denuncia.estado_detele=1 order by denuncia.id_den asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async productosBloqueados (req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select producto.nombre,producto.descripcion as \"DESCRIPRODUC\",producto.nom_cat,producto.precio,producto.ruta,denuncia.descripcion,denuncia.fecha,denuncia.id_producto from producto,denuncia where producto.id_producto=denuncia.id_producto and denuncia.estado_detele=0 order by denuncia.id_den asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async crearDenuncia(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { descripcion,fecha,id_producto,id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into denuncia(descripcion,fecha,id_producto,id_c) values(:descripcion,:fecha,:id_producto,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[descripcion,fecha,id_producto,id_c],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Denuncia Guardado"
        });
    }

    public async deleteProductoEnDenuncia(req :Request,res: Response){
        var autoCommit=true;
        const { id_producto } = req.body; 

        let sql= "update denuncia set estado_detele=0 where id_producto=:id_producto";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_producto], { autoCommit });
        cnn.release();

        res.status(201).send({msg:"Producto Eliminado"});
    }

}

export const indexControllerDenuncia= new IndexControllerDenuncia();