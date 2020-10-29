import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerReportes{
  
    public async bitacoraASC(req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select * from bitacora order by id_bit asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async bitacoraDESC(req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select * from bitacora order by id_bit desc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

}

export const indexControllerReportes= new IndexControllerReportes();