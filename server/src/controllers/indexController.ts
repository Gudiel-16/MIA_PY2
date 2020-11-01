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
        let sql = "select * from producto where estado_detele=1 and id_c != :id_c";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c], { autoCommit });
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
        const { id_c } = req.body; 
        let sql = "select * from producto where id_c != :id_c order by precio asc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPrecioDESC (req :Request,res: Response) {
        var autoCommit=false;
        const { id_c } = req.body; 
        let sql = "select * from producto where id_c != :id_c order by precio desc";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPorNomCategoria (req :Request,res: Response) {
        var autoCommit=false;
        const { nom_cat,id_c } = req.body;
        let sql = "select * from producto where id_c != :id_c and nom_cat=:nom_cat";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,nom_cat], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async obtenerProductosPorPalabraClave (req :Request,res: Response) {
        var autoCommit=false;
        const { palab_clave,id_c } = req.body;
        let sql = "select id_producto,nombre,descripcion, palab_clave,precio,ruta,nom_cat,id_c, instr(palab_clave,:palab_clave,1,1) from producto where instr(palab_clave,:palab_clave,1,1)=1 and id_c != :id_c";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [palab_clave,palab_clave,id_c], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows);
    }

    public async deleteProducto(req :Request,res: Response){
        var autoCommit=true;
        const { id_producto } = req.body; 

        let sql= "update producto set estado_detele=0 where id_producto=:id_producto"
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_producto], { autoCommit });
        cnn.release();

        res.status(201).send({msg:"Producto Eliminado"});
    }

    public async actualizarDatosProducto(req :Request,res: Response){
        var autoCommit=true;
        const { nombre, descripcion, palab_clave, precio, ruta, nom_cat, id_producto } = req.body; //req.body, recibe un cuerpo de msj (un json)

        let sql= "update producto set nombre=:nombre, descripcion=:descripcion, palab_clave=:palab_clave, precio=:precio, ruta=:ruta, nom_cat=:nom_cat where id_producto=:id_producto"
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [nombre, descripcion, palab_clave, precio, ruta, nom_cat,id_producto], { autoCommit });
        cnn.release();

        res.status(201).send({msg:"Producto Actualizado"});
    }
}

export const indexController= new IndexController();