import { Request, Response } from 'express';

//obtengo la base de datos
//import BD from '../database'
const oracledb = require('oracledb');
//credenciales de conexion de base de datos
import  keys  from '../keys';

class IndexControllerAdmin{

    public async buscarAdmin (req :Request,res: Response) {
        var autoCommit=false;
        const {correo, pass} = req.body; 

        let sql = "select id_ad, nombre, apellido, correo, pais, fech_nac, pass, image from administrador where correo=:correo and pass=:pass";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [correo,pass], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json(
                {
                    msg:true,
                    datauser:{
                        "id_ad":result.rows[0][0],
                        "nombre":result.rows[0][1],
                        "apellido":result.rows[0][2],
                        "correo":result.rows[0][3],
                        "pais":result.rows[0][4],
                        "fech_nac":result.rows[0][5],
                        "pass":result.rows[0][6],
                        "image":result.rows[0][7]
                    }
                }
            );
        }else{
            res.status(201).json({msg:false});
        }
    }

    public async datosPerfilAdmin (req :Request,res: Response) {
        var autoCommit=false;
        const { id_ad } = req.body; 

        let sql = "select id_ad, nombre, apellido, correo, pais, fech_nac, pass, image from administrador where id_ad=:id_ad";
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [id_ad], { autoCommit });
        cnn.release();

        //si existe
        if(result.rows.length>0){
            res.status(201).json(
                {
                    datauser:{
                        "id_ad":result.rows[0][0],
                        "nombre":result.rows[0][1],
                        "apellido":result.rows[0][2],
                        "correo":result.rows[0][3],
                        "pais":result.rows[0][4],
                        "fech_nac":result.rows[0][5],
                        "pass":result.rows[0][6],
                        "image":result.rows[0][7]
                    }
                }
            );
        }else{
            res.status(201).json({msg:false});
        }
    }

    public async actualizarDatosAdmin(req :Request,res: Response){
        var autoCommit=true;
        const { id_ad, nombre, apellido, pais, fech_nac, pass, image } = req.body; //req.body, recibe un cuerpo de msj (un json)
        console.log(req.body);
        let sql= "update administrador set nombre=:nombre, apellido=:apellido, pais=:pais, fech_nac=:fech_nac, pass=:pass, image=:image where id_ad=:id_ad"
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [nombre,apellido,pais,fech_nac,pass,image,id_ad], { autoCommit });
        cnn.release();

        res.status(201).send({msg:"Datos Administrador Actualizado"});
    }
}

export const indexControllerAdmin= new IndexControllerAdmin();