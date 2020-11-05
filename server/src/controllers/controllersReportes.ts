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

    public async reporteProductosMasVendidos(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select cliente.nombre "nombre vendedor", producto.nombre "nombre producto", sum(detalle_cv.cantidad) "cantidad vendida" from cliente\
                    join producto on producto.id_c= cliente.id_c\
                    join detalle_cv on detalle_cv.id_producto = producto.id_producto\
                    group by cliente.nombre, producto.nombre\
                    order by "cantidad vendida" desc';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async reporteProductosMasMegusta(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select cliente.nombre "nombre vendedor", producto.nombre, count(reaccion.megusta) "cantidad" from cliente\
                    inner join producto on producto.id_c=cliente.id_c\
                    inner join reaccion on reaccion.id_producto=producto.id_producto\
                    where reaccion.megusta=1\
                    group by cliente.nombre,producto.nombre\
                    order by "cantidad" desc\
                    fetch first 10 rows only';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async reporteProductosMasNoMegusta(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select cliente.nombre "nombre vendedor",producto.nombre, count(reaccion.nomegusta) "cantidad" from cliente\
                    inner join producto on producto.id_c=cliente.id_c\
                    inner join reaccion on reaccion.id_producto=producto.id_producto\
                    where reaccion.nomegusta=1\
                    group by cliente.nombre,producto.nombre\
                    order by "cantidad" desc\
                    fetch first 10 rows only';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async reporteClienteMasMenosCredito(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select * from\
                    (\
                    select nombre,correo,fech_nac,creditos\
                    from cliente\
                    order by creditos desc\
                    fetch first 10 rows only\
                    )\
                    union all\
                    select * from\
                    (\
                    select nombre,correo,fech_nac,creditos\
                    from cliente\
                    order by creditos asc\
                    fetch first 10 rows only\
                    )';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async reporteClienteMasDenuncia(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select cliente.nombre, cliente.correo, cliente.fech_nac, count(denuncia.id_c) as "cantidad" from cliente join denuncia\
                    on cliente.id_c=denuncia.id_c\
                    group by cliente.nombre, cliente.correo, cliente.fech_nac\
                    order by "cantidad" desc\
                    fetch first 10 rows only';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async reporteClienteMasPublicaciones(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select cliente.nombre, cliente.correo, cliente.creditos, producto.id_c, count(producto.id_c) as "cantidad" from cliente join producto\
                    on cliente.id_c=producto.id_c\
                    group by cliente.nombre, cliente.correo, cliente.creditos, producto.id_c\
                    order by "cantidad" desc\
                    fetch first 10 rows only';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    public async reportePaisesMasCreditoProducto(req :Request,res: Response) {
        var autoCommit=false;
        let sql = 'select "pais", sum("cantClient") as "cantidad clientes", sum("cantCredit") as "cantidad creditos", sum("cantProduct") as "cantidad productos" from\
                    (\
                    select  cliente.pais "pais", count(distinct cliente.id_c) "cantClient", cliente.creditos "cantCredit" , count(producto.id_c) "cantProduct" from cliente\
                    inner join producto on cliente.id_c=producto.id_c\
                    group by cliente.pais, cliente.creditos\
                    fetch first 10 rows only\
                    )\
                    group by "pais"\
                    order by "cantidad creditos" desc';
        let cnn = await oracledb.getConnection(keys.cns);
        let result = await cnn.execute(sql, [], { autoCommit });
        cnn.release();
        //console.log(result)
        res.status(200).json(result.rows); //para que me devuelva solo las filas, y no el metadata tambien
    }

    

}

export const indexControllerReportes= new IndexControllerReportes();