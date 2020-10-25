import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerReaccion{

    public async insertar(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { megusta, nomegusta, id_producto, id_c} = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into reaccion(megusta,nomegusta,id_producto,id_c) values(:megusta,:nomegusta,:id_producto,:id_c)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[megusta,nomegusta,id_producto,id_c],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Reaccion Guardada"
        });
    }

    public async cantidadMegusta (req :Request,res: Response) {
        var autoCommit=false;
        const {id_producto} = req.body; 

        let sql = "select count(megusta) as \"megusta\" from reaccion where id_producto=:id_producto and megusta=1";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_producto], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json(
                {
                    data:{
                        "megusta":result.rows[0][0]
                    }
                }
            );
        }else{
            res.status(201).json(
                {
                    data:{
                        "megusta":0
                    }
                }
            );
        }
    }

    public async cantidadNomegusta (req :Request,res: Response) {
        var autoCommit=false;
        const {id_producto} = req.body; 

        let sql = "select count(nomegusta) as \"nomegusta\" from reaccion where id_producto=:id_producto and nomegusta=1";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_producto], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json(
                {
                    data:{
                        "nomegusta":result.rows[0][0]
                    }
                }
            );
        }else{
            res.status(201).json(
                {
                    data:{
                        "nomegusta":0
                    }
                }
            );
        }
    }

    public async siExiste_idUsarioIdProducto (req :Request,res: Response) {
        var autoCommit=false;
        const {id_c, id_producto} = req.body; 

        let sql = "select * from reaccion where id_c=:id_c and id_producto =:id_producto";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,id_producto], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json({msg:true});
        }else{
            res.status(201).json({msg:false});
        }
    }

    public async siUsuarioYaDioMeGusta (req :Request,res: Response) {
        var autoCommit=false;
        const {id_c, id_producto} = req.body; 

        let sql = "select * from reaccion where id_c=:id_c and id_producto=:id_producto and megusta=1";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,id_producto], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json({msg:true});
        }else{
            res.status(201).json({msg:false});
        }
    }

    public async siUsuarioYaDioNoMeGusta (req :Request,res: Response) {
        var autoCommit=false;
        const {id_c, id_producto} = req.body; 

        let sql = "select * from reaccion where id_c=:id_c and id_producto=:id_producto and nomegusta=1";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,id_producto], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json({msg:true});
        }else{
            res.status(201).json({msg:false});
        }
    }

    public async deMegustaAnomegusta (req :Request,res: Response) {
        var autoCommit=true;
        const {id_c, id_producto} = req.body; 

        let sql = "update reaccion set megusta=0, nomegusta=1 where id_c=:id_c and id_producto=:id_producto";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,id_producto], { autoCommit });
        cnn.release();

        //si existe
        res.status(201).send({msg:"De megusta a nomegusta Actualizado"});
    }

    public async deNoMegustaAmegusta (req :Request,res: Response) {
        var autoCommit=true;
        const {id_c, id_producto} = req.body; 

        let sql = "update reaccion set megusta=1, nomegusta=0 where id_c=:id_c and id_producto=:id_producto";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_c,id_producto], { autoCommit });
        cnn.release();

        //si existe
        res.status(201).send({msg:"De nomegusta a megusta Actualizado"});
    }
}

export const indexControllerReaccion= new IndexControllerReaccion();