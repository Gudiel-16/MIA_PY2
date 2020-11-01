import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerMisProductos{

    public async obtenerUnProducto (req :Request,res: Response) {
        //res.json({text:'Usuario con ID' + req.params.id});
        const idProd=req.params.id;
        var autoCommit=false;
        let sql = "select * from producto where id_producto="+idProd;
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        //si existe
        if(result.rows.length>0){
            res.status(201).json(
                {
                    dataproduct:{
                        "id_producto":result.rows[0][0],
                        "nombre":result.rows[0][1],
                        "descripcion":result.rows[0][2],
                        "palab_clave":result.rows[0][3],
                        "precio":result.rows[0][4],
                        "ruta":result.rows[0][5],
                        "nom_cat":result.rows[0][6],
                        "id_c":result.rows[0][7]
                    }
                }
            );
        }else{
            res.status(201).json({msg:false});
        }

    }

    public async obtenerTodosProductos (req :Request,res: Response) {
        var autoCommit=false;
        const { id_c } = req.body;
        let sql = "select * from producto where estado_detele=1 and id_c=:id_c";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPrecioASC (req :Request,res: Response) {
        var autoCommit=false;
        const { id_c } = req.body; 
        let sql = "select * from producto where id_c = :id_c order by precio asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPrecioDESC (req :Request,res: Response) {
        var autoCommit=false;
        const { id_c } = req.body; 
        let sql = "select * from producto where id_c = :id_c order by precio desc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPorNomCategoria (req :Request,res: Response) {
        var autoCommit=false;
        const { nom_cat,id_c } = req.body;
        let sql = "select * from producto where id_c = :id_c and nom_cat=:nom_cat";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,nom_cat], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPorPalabraClave (req :Request,res: Response) {
        var autoCommit=false;
        const { palab_clave,id_c } = req.body;
        let sql = "select id_producto,nombre,descripcion, palab_clave,precio,ruta,nom_cat,id_c, instr(palab_clave,:palab_clave,1,1) from producto where instr(palab_clave,:palab_clave,1,1)=1 and id_c = :id_c";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [palab_clave,palab_clave,id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }
}

export const indexControllerMisProductos= new IndexControllerMisProductos();