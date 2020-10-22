import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerCliente{

    public async crearCliente(req :Request,res: Response){
        //son los valores que recibe para insertar, y son los nombres de los campos de nuestra tabla
        var autoCommit=true;
        const { id_c, nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion} = req.body; //req.body, recibe un cuerpo de msj (un json)

        // los : son porque reciben parametros
        let sql = "insert into cliente(nombre,apellido,correo,pais,fech_nac,pass,image,creditos,confirmacion) values (:nombre,:apellido,:correo,:pais,:fech_nac,:pass,:image,:creditos,:confirmacion)";

        let cnn=await oracledb.getConnection(keys.cns);
        await cnn.execute(sql,[nombre,apellido,correo,pais,fech_nac,pass,image,creditos,confirmacion],{autoCommit});
        cnn.release();

        //devuelvo el dato que se inserto
        res.status(200).json({
            "Respuesta": "Cliente Guardado"
        });
    }

    public async buscarCliente (req :Request,res: Response) {
        var autoCommit=false;
        const { correo, pass} = req.body; 

        let sql = "select id_c, nombre, apellido, correo, pais, fech_nac, pass, image, creditos, confirmacion from cliente where correo=:correo and pass=:pass and confirmacion=1";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [correo,pass], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json(
                {
                    msg:true,
                    datauser:{
                        "id_c":result.rows[0][0],
                        "nombre":result.rows[0][1],
                        "apellido":result.rows[0][2],
                        "correo":result.rows[0][3],
                        "pais":result.rows[0][4],
                        "fech_nac":result.rows[0][5],
                        "pass":result.rows[0][6],
                        "image":result.rows[0][7],
                        "creditos":result.rows[0][8]
                    }
                }
            );
        }else{
            res.status(201).json({msg:false});
        }
    }
    
    public async actualizarEstadoConfirmacionCliente(req :Request,res: Response){
        var autoCommit=true;
        const { correo, pass} = req.body; 

        let sql= "update cliente set confirmacion=1 where correo=:correo and pass=:pass"
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [correo,pass], { autoCommit });
        cnn.release();

        res.status(201).send({msg:"Usuario Actualizado"});


    }
}

export const indexControllerCliente= new IndexControllerCliente();