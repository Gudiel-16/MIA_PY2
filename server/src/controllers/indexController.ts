import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexController{

    public async obtenerUnProducto (req :Request,res: Response) {
        //res.json({text:'Usuario con ID' + req.params.id});
        const idProd=req.params.id;
        var autoCommit=false;
        let sql = "select * from producto where id_producto="+idProd;
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result);
    }

    public async obtenerTodosProductos (req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select * from producto";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async crearProducto(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { id_producto, nombre, descripcion, palab_clave,ruta,precio,nom_cat,id_c } = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into producto(nombre,descripcion,palab_clave,precio,ruta,nom_cat,id_c) values (:nombre,:descripcion,:palab_clave,:precio,:ruta,:nom_cat,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[nombre,descripcion,palab_clave,precio,ruta,nom_cat,id_c],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Producto Guardado"
        });
    }

    public async obtenerProductosPrecioASC (req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select * from producto order by precio asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPrecioDESC (req :Request,res: Response) {
        var autoCommit=false;
        let sql = "select * from producto order by precio desc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPorNomCategoria (req :Request,res: Response) {
        var autoCommit=false;
        const { nom_cat } = req.body;
        let sql = "select * from producto where nom_cat=:nom_cat";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [nom_cat], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPorPalabraClave (req :Request,res: Response) {
        var autoCommit=false;
        const { palab_clave } = req.body;
        let sql = "select id_producto,nombre,descripcion, palab_clave,precio,nom_cat,id_c, instr(palab_clave,:palab_clave,1,1) from producto where instr(palab_clave,:palab_clave,1,1)=1";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [palab_clave], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }
}

export const indexController= new IndexController();