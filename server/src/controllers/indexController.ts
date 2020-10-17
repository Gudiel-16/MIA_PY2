import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexController{
    public obtenerUsuario (req :Request,res: Response) {
        //res.json({text:'Usuario con ID' + req.params.id});
       
    }

    public async obtenerTodosUsuarios (req :Request,res: Response) {
        let sql = "select * from producto";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { true:Boolean });
        cnn.release();
        console.log(result)
        res.status(200).json(result);
    }

    public crearUsuario(req :Request,res: Response){
        res.json({text:'Creando usuario...'});
    }

    public actualizarUsuario(req :Request,res: Response){
        res.json({text:'Acutalizando usuario...' + req.params.id });
    }
}

export const indexController= new IndexController();