import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerCategoria{

    public async crearCategoria(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { id_ad, nombre} = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into categoria(nombre,id_ad) values (:nombre,:id_ad)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[nombre,id_ad],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Categoria Guardada"
        });
    }

    public async obtenerCategorias (req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select nombre from categoria";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

}

export const indexControllerCategoria= new IndexControllerCategoria();